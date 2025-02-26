# app/main.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from PIL import Image
import io
from .quality_model import FruitQualityModel

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize model
model = FruitQualityModel()

@app.get("/")
async def root():
    return {"message": "Fruit Quality Analysis API"}

@app.post("/api/analyze")
async def analyze_fruit(file: UploadFile = File(...)):
    try:
        # Read and validate image file
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Read image file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Convert image to numpy array
        img_array = np.array(image)
        
        # Get predictions from model
        results = model.predict(img_array)
        
        return results
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

