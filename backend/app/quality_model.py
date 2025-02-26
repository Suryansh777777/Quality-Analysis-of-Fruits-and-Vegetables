import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import json

class FruitQualityModel:
    def __init__(self):
        # Load model
        self.model_path = "models/fruit_quality_model.h5"
        self.model = tf.keras.models.load_model(self.model_path)
        self.model.compile(optimizer="adam", 
                          loss="categorical_crossentropy", 
                          metrics=["accuracy"])

        # Load class indices
        self.class_indices_path = "models/class_indices.json"
        with open(self.class_indices_path, "r") as f:
            class_indices = json.load(f)
        
        # Reverse class indices for prediction lookup
        self.class_labels = {v: k for k, v in class_indices.items()}

        # Define shelf life mapping
        self.shelf_life_mapping = {
            "fresh_apple_ripe": 5, "fresh_apple_underripe": 12, "fresh_apple_overripe": 2,
            "fresh_banana_ripe": 5, "fresh_banana_underripe": 12, "fresh_banana_overripe": 2,
            "fresh_orange_ripe": 7, "fresh_orange_underripe": 15, "fresh_orange_overripe": 3,
            "fresh_bitter_gourd": 6, "rotten_bitter_gourd": 0,
            "fresh_capsicum": 10, "rotten_capsicum": 0,
            "fresh_tomato": 7, "rotten_tomato": 0,
            "rotten_apple": 0, "rotten_banana": 0, "rotten_orange": 0
        }

    def preprocess_image(self, img_data):
        """Preprocess the input image for model prediction."""
        try:
            # Convert to RGB if needed
            if len(img_data.shape) == 2:
                img_data = np.stack((img_data,) * 3, axis=-1)
            
            # Resize image
            img_data = tf.image.resize(img_data, (224, 224))
            
            # Normalize pixel values
            img_data = img_data / 255.0
            
            # Add batch dimension
            img_data = np.expand_dims(img_data, axis=0)
            
            return img_data
        
        except Exception as e:
            raise Exception(f"Image preprocessing failed: {str(e)}")

    def predict(self, image_data):
        """Make predictions on the input image."""
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image_data)
            
            # Get model predictions
            predictions = self.model.predict(processed_image)
            predicted_class_idx = np.argmax(predictions)
            
            # Debug logging
            print("🔹 Raw Model Predictions:", predictions)
            print("🔹 Predicted Class Index:", predicted_class_idx)
            
            # Validate predicted class
            if predicted_class_idx not in self.class_labels:
                raise ValueError(f"Invalid class index {predicted_class_idx}. Check model training.")
            
            class_name = self.class_labels[predicted_class_idx]
            print("🔹 Predicted Class Name:", class_name)

            # Determine freshness
            freshness = "Rotten" if "rotten" in class_name else "Fresh"

            # Determine ripeness level
            ripeness = None
            if "fresh" in class_name:
                parts = class_name.split("_")
                if len(parts) > 2:
                    ripeness = parts[-1]

            # Determine shelf life
            shelf_life = self.shelf_life_mapping.get(class_name, "Unknown")

            # Prepare results
            result = {"Freshness": freshness}
            if freshness == "Fresh" and ripeness:
                result["Ripeness"] = ripeness.capitalize()
            if freshness == "Fresh" or shelf_life == 0:
                result["Shelf Life"] = f"{shelf_life} days"

            return result

        except Exception as e:
            raise Exception(f"Prediction failed: {str(e)}")
