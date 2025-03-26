import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from typing import List, Dict, Any, Tuple
import plotly.express as px
import plotly.graph_objects as go

class AnomalyDetector:
    def __init__(self, contamination=0.1):
        self.contamination = contamination
        self.model = IsolationForest(contamination=contamination, random_state=42)
        self.numerical_columns = []
        
    def detect_anomalies(self, df: pd.DataFrame) -> Tuple[pd.DataFrame, Dict[str, Any]]:
        """Detect anomalies in numerical columns"""
        # Identify numerical columns
        self.numerical_columns = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if not self.numerical_columns:
            return df, {}
        
        # Prepare data for anomaly detection
        X = df[self.numerical_columns].copy()
        
        # Fit and predict
        self.model.fit(X)
        predictions = self.model.predict(X)
        
        # Add anomaly flags and scores
        result_df = df.copy()
        result_df['anomaly_score'] = self.model.score_samples(X)
        result_df['is_anomaly'] = (predictions == -1).astype(int)
        
        # Generate visualizations
        visualizations = self._generate_visualizations(result_df)
        
        return result_df, visualizations
    
    def _generate_visualizations(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generate visualizations for anomalies"""
        visualizations = {}
        
        for col in self.numerical_columns:
            # Create box plot
            fig = px.box(df, y=col, title=f'Distribution of {col}')
            visualizations[f'{col}_box'] = fig.to_json()
            
            # Create scatter plot with anomaly highlighting
            fig = px.scatter(
                df,
                x=df.index,
                y=col,
                color='is_anomaly',
                title=f'Anomalies in {col}'
            )
            visualizations[f'{col}_scatter'] = fig.to_json()
        
        return visualizations
    
    def get_anomaly_summary(self, df: pd.DataFrame) -> Dict[str, Any]:
        """Generate summary statistics for anomalies"""
        summary = {
            'total_records': len(df),
            'anomaly_count': df['is_anomaly'].sum(),
            'anomaly_percentage': (df['is_anomaly'].sum() / len(df)) * 100,
            'column_summaries': {}
        }
        
        for col in self.numerical_columns:
            col_anomalies = df[df['is_anomaly'] == 1][col]
            summary['column_summaries'][col] = {
                'mean': col_anomalies.mean(),
                'std': col_anomalies.std(),
                'min': col_anomalies.min(),
                'max': col_anomalies.max()
            }
        
        return summary 