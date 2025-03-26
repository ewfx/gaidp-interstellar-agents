from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import pandas as pd
import numpy as np
from typing import List, Dict, Any
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Data Profiling Platform",
    description="API for data profiling and anomaly detection",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def clean_nan_values(obj):
    """Recursively clean NaN values from dictionaries and lists"""
    if isinstance(obj, dict):
        return {k: clean_nan_values(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [clean_nan_values(item) for item in obj]
    elif pd.isna(obj) or obj is None:
        return None
    return obj

@app.get("/")
async def root():
    return {"message": "Welcome to Data Profiling Platform API"}

@app.post("/upload/data")
async def upload_data(file: UploadFile = File(...)):
    try:
        # Read the uploaded CSV file
        df = pd.read_csv(file.file)
        return {
            "message": "Data uploaded successfully",
            "columns": df.columns.tolist(),
            "rows": len(df),
            "preview": clean_nan_values(df.head().to_dict(orient="records"))
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload/rules")
async def upload_rules(file: UploadFile = File(...)):
    try:
        # Read the uploaded rules CSV file
        rules_df = pd.read_csv(file.file)
        # Clean NaN values before converting to dict
        rules_dict = clean_nan_values(rules_df.to_dict(orient="records"))
        return {
            "message": "Rules uploaded successfully",
            "rules": rules_dict
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/analyze")
async def analyze_data(data_file: UploadFile = File(...), rules_file: UploadFile = File(...)):
    try:
        # Read both files
        df = pd.read_csv(data_file.file)
        rules_df = pd.read_csv(rules_file.file)
        
        # TODO: Implement the analysis logic
        # 1. Rule validation
        # 2. Anomaly detection
        # 3. Generate results
        
        # For now, return dummy data
        return {
            "message": "Analysis completed successfully",
            "results": {
                "rule_violations": [],
                "anomalies": [],
                "kpis": {
                    "total_records": len(df),
                    "rule_violations_count": 0,
                    "anomalies_count": 0
                }
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/results")
async def get_results():
    try:
        # For now, return dummy data
        # In a real implementation, this would fetch from a database or cache
        return {
            "columns": ["CustomerID", "InternalObligor ID", "ObligorName", "City", "Country"],
            "data": [
                {
                    "id": 1,
                    "CustomerID": "vX45Iz79",
                    "InternalObligor ID": "cc24Bt37",
                    "ObligorName": "hair",
                    "City": "North Heather",
                    "Country": "simply"
                }
            ],
            "kpis": {
                "total_records": 100,
                "rule_violations_count": 5,
                "anomalies_count": 3
            },
            "visualizations": [
                {
                    "data": '[{"type":"box","y":[1,2,3,4,5],"name":"Distribution"}]',
                    "layout": '{"title":"Sample Distribution"}'
                }
            ],
            "summary": "Analysis completed successfully. Found 5 rule violations and 3 anomalies in the dataset."
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001) 