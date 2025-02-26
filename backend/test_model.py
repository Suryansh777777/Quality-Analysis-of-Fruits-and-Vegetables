import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'  # Suppress TensorFlow logging
from app.quality_model import FruitQualityModel
from tensorflow.keras.preprocessing import image
import numpy as np

def test_model():
    try:
        # Initialize the model
        print("Initializing model...")
        model_service = FruitQualityModel()
        print("✅ Model loaded successfully!")

        # Test with a sample image
        test_image_path = "/home/surya/codes/Quality-Analysis-of-Fruits-and-Vegetables/backend/images/testimage3.png"
        if not os.path.exists(test_image_path):
            print("❌ Test image not found!")
            return

        # Load and preprocess the image
        print("\nLoading image...")
        img = image.load_img(test_image_path)
        img_array = image.img_to_array(img)

        print("\nTesting prediction...")
        result = model_service.predict(img_array)
        
        print("\nPrediction Results:")
        print("==================")
        for key, value in result.items():
            print(f"{key}: {value}")
        
        print("\n✅ Test completed successfully!")

    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")
        print("\nDebug information:")
        print("=================")
        print(f"Python path: {os.environ.get('PYTHONPATH')}")
        print(f"Current directory: {os.getcwd()}")
        print(f"Model directory contents: {os.listdir('models') if os.path.exists('models') else 'models directory not found'}")

if __name__ == "__main__":
    test_model()