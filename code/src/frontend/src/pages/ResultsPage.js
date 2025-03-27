import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Plot from 'react-plotly.js';
import axios from 'axios';

const ResultsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get('http://localhost:8000/results');
      setResults(response.data);
    } catch (err) {
      setError('Error fetching results: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  const renderKPIs = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Rule Violations
            </Typography>
            <Typography variant="h3" color="error">
              {results?.kpis?.rule_violations_count || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {((results?.kpis?.rule_violations_count / results?.kpis?.total_records) * 100).toFixed(2)}% of records
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Anomalies Detected
            </Typography>
            <Typography variant="h3" color="warning.main">
              {results?.kpis?.anomalies_count || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {((results?.kpis?.anomalies_count / results?.kpis?.total_records) * 100).toFixed(2)}% of records
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Total Records
            </Typography>
            <Typography variant="h3" color="primary">
              {results?.kpis?.total_records || 0}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Analyzed records
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  const renderVisualizations = () => (
    <Grid container spacing={3}>
      {results?.visualizations?.map((viz, index) => (
        <Grid item xs={12} md={6} key={index}>
          <Paper sx={{ p: 2 }}>
            <Plot
              data={JSON.parse(viz.data)}
              layout={JSON.parse(viz.layout)}
              config={{ responsive: true }}
            />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  const renderDataGrid = () => {
    const columns = results?.columns?.map((col) => ({
      field: col,
      headerName: col,
      width: 150,
    })) || [];

    return (
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={results?.data || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Paper>
    );
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Detailed Analysis Results
      </Typography>

      {renderKPIs()}

      <Box sx={{ mt: 4 }}>
        <Tabs value={selectedTab} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Visualizations" />
          <Tab label="Data Grid" />
          <Tab label="Summary" />
        </Tabs>

        {selectedTab === 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Visualizations
            </Typography>
            {renderVisualizations()}
          </Box>
        )}

        {selectedTab === 1 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Detailed Results
            </Typography>
            {renderDataGrid()}
          </Box>
        )}

        {selectedTab === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Summary
            </Typography>
            <Paper sx={{ p: 3 }}>
              <Typography variant="body1" paragraph>
                {results?.summary || 'No summary available'}
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ResultsPage; 