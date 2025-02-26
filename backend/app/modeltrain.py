import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping, ReduceLROnPlateau
import json

class FruitQualityModelTrainer:
    def __init__(self, dataset_path):
        self.dataset_path = dataset_path
        self.IMG_SIZE = 224
        self.batch_size = 32
        self.class_indices = None
        self.model = None

    def setup_data_generators(self):
        train_datagen = ImageDataGenerator(
            rescale=1.0/255.0,
            rotation_range=30,
            width_shift_range=0.2,
            height_shift_range=0.2,
            shear_range=0.2,
            zoom_range=0.2,
            horizontal_flip=True,
            validation_split=0.2
        )

        self.train_generator = train_datagen.flow_from_directory(
            self.dataset_path,
            target_size=(self.IMG_SIZE, self.IMG_SIZE),
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='training'
        )

        self.val_generator = train_datagen.flow_from_directory(
            self.dataset_path,
            target_size=(self.IMG_SIZE, self.IMG_SIZE),
            batch_size=self.batch_size,
            class_mode='categorical',
            subset='validation'
        )

        self.class_indices = self.train_generator.class_indices

    def build_model(self):
        self.model = Sequential([
            Conv2D(32, (3,3), activation='relu', input_shape=(self.IMG_SIZE, self.IMG_SIZE, 3)),
            MaxPooling2D(2,2),
            Conv2D(64, (3,3), activation='relu'),
            MaxPooling2D(2,2),
            Conv2D(128, (3,3), activation='relu'),
            MaxPooling2D(2,2),
            Flatten(),
            Dense(128, activation='relu'),
            Dropout(0.5),
            Dense(len(self.class_indices), activation='softmax')
        ])

        self.model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )

    def train(self, epochs=20):
        callbacks = [
            EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True),
            ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=1e-6)
        ]

        history = self.model.fit(
            self.train_generator,
            epochs=epochs,
            validation_data=self.val_generator,
            callbacks=callbacks
        )
        return history

    def save_model(self, model_path, class_indices_path):
        self.model.save(model_path)
        with open(class_indices_path, "w") as f:
            json.dump(self.class_indices, f)
