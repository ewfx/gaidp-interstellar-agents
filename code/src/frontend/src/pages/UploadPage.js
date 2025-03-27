import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Paper,
  Card,
  CardContent,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  LinearProgress,
  Alert,
  IconButton,
  Tooltip,
  Chip,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Preview as PreviewIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Rule as RuleIcon,
  DataObject as DataObjectIcon,
  PlayArrow as PlayArrowIcon,
  Verified as VerifiedIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';
import Papa from 'papaparse';

const UploadPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dataFileInput = useRef(null);
  const ruleFileInput = useRef(null);
  const [dataFile, setDataFile] = useState(null);
  const [ruleFile, setRuleFile] = useState(null);
  const [dataPreview, setDataPreview] = useState(null);
  const [rulePreview, setRulePreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [validationRules, setValidationRules] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [validationStep, setValidationStep] = useState(0);

  const parseCSV = (file) => {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(new Error('Error parsing CSV file'));
            return;
          }
          resolve(results.data);
        },
        header: true,
        skipEmptyLines: true,
        error: (error) => {
          reject(error);
        },
      });
    });
  };

  const handleDataFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setDataFile(file);
        setError(null);
        const data = await parseCSV(file);
        
        // Create columns from the first row
        const columns = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
        }));

        // Add IDs to rows
        const rows = data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        setDataPreview({
          columns,
          rows,
          totalRows: rows.length,
        });
      } catch (err) {
        setError('Error parsing data file. Please ensure it is a valid CSV file.');
        setDataFile(null);
        setDataPreview(null);
      }
    }
  };

  const handleRuleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        setRuleFile(file);
        setError(null);
        const data = await parseCSV(file);
        
        // Create columns dynamically from the first row
        const columns = Object.keys(data[0]).map((key) => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          width: 150,
        }));

        // Transform CSV data into validation rules format
        const rules = data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        setValidationRules(rules);
        setRulePreview({
          columns,
          rows: rules,
          totalRows: rules.length,
        });
      } catch (err) {
        setError('Error parsing rules file. Please ensure it is a valid CSV file.');
        setRuleFile(null);
        setValidationRules([]);
        setRulePreview(null);
      }
    }
  };

  const handleRemoveFile = (type) => {
    if (type === 'data') {
      setDataFile(null);
      setDataPreview(null);
    } else {
      setRuleFile(null);
      setRulePreview(null);
    }
  };

  const handleAnalyze = () => {
    if (!dataPreview || !rulePreview) {
      setError('Please upload both data and rule files before proceeding');
      return;
    }

    setIsValidating(true);
    setValidationStep(0);

    // Transform the data for analysis
    const transformedData = dataPreview.rows.map((row, index) => ({
      id: index + 1,
      ...row,
      amount: parseFloat(row.amount) || 0,
      date: row.date || new Date().toISOString().split('T')[0],
      customer: row.customer || `CUST${index + 1}`,
    }));

    // Transform the rules for analysis
    const transformedRules = rulePreview.rows.map((rule, index) => ({
      id: index + 1,
      rule_name: rule.rule_name || `Rule ${index + 1}`,
      field: rule.field || '',
      rule_type: rule.rule_type || 'required',
      severity: rule.severity || 'warning',
      description: rule.description || 'No description provided',
      min: parseFloat(rule.min) || 0,
      max: parseFloat(rule.max) || Infinity,
      pattern: rule.pattern || '',
    }));

    // Simulate validation steps
    const steps = [
      { message: 'Initializing validation...', duration: 1000 },
      { message: 'Loading data files...', duration: 1500 },
      { message: 'Applying validation rules...', duration: 2000 },
      { message: 'Checking data integrity...', duration: 1500 },
      { message: 'Generating analysis report...', duration: 2000 },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigate('/analysis', {
            state: {
              data: transformedData,
              rules: transformedRules,
            },
          });
        }, 1000);
        return;
      }

      setValidationStep(currentStep);
      currentStep++;
    }, steps[currentStep].duration);
  };

  const renderValidationOverlay = () => (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(0, 0, 0, 0.8)',
      }}
      open={isValidating}
    >
      <Box sx={{ textAlign: 'center' }}>
        <CircularProgress
          size={80}
          thickness={4}
          sx={{ color: 'primary.main', mb: 3 }}
        />
        <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
          Validating Your Data
        </Typography>
        <Typography variant="body1" sx={{ color: 'white', mb: 4 }}>
          {[
            'Initializing validation...',
            'Loading data files...',
            'Applying validation rules...',
            'Checking data integrity...',
            'Generating analysis report...',
          ][validationStep]}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {[0, 1, 2, 3, 4].map((step) => (
            <Box
              key={step}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: step <= validationStep ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Box>
    </Backdrop>
  );

  const renderUploadSection = () => (
    <Box>
      <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CloudUploadIcon color="primary" />
        Upload Your Data
      </Typography>
      <Grid container spacing={3}>
        {/* Data File Upload */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                borderColor: 'primary.main',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <DataObjectIcon color="primary" />
              Financial Data
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload your financial data file (CSV format)
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'primary.main',
                  background: 'rgba(25, 118, 210, 0.04)',
                },
              }}
              onClick={() => dataFileInput.current?.click()}
            >
              <input
                type="file"
                ref={dataFileInput}
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleDataFileUpload}
              />
              {dataPreview ? (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {dataFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dataPreview.totalRows} total rows
                  </Typography>
                  <Box sx={{ mt: 2, height: 300 }}>
                    <DataGrid
                      rows={dataPreview.rows}
                      columns={dataPreview.columns.map(col => ({
                        ...col,
                        flex: 1,
                        minWidth: 150,
                        renderCell: (params) => (
                          <Box sx={{ 
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            lineHeight: 1.2,
                            py: 1
                          }}>
                            {params.value}
                          </Box>
                        ),
                      }))}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 25]}
                      pagination
                      paginationMode="client"
                      disableSelectionOnClick
                      sx={{
                        '& .MuiDataGrid-cell': {
                          fontSize: '0.875rem',
                          whiteSpace: 'normal',
                          lineHeight: 1.2,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                          bgcolor: 'background.default',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDataFile(null);
                      setDataPreview(null);
                    }}
                  >
                    Change File
                  </Button>
                </Box>
              ) : (
                <Box>
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag and drop your CSV file here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    or click to browse
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Rule File Upload */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'all 0.3s ease',
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
              border: '1px solid',
              borderColor: 'divider',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                borderColor: 'primary.main',
              },
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RuleIcon color="primary" />
              Validation Rules
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Upload your validation rules file (CSV format)
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 3,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'rgba(255, 255, 255, 0.5)',
                '&:hover': {
                  borderColor: 'primary.main',
                  background: 'rgba(25, 118, 210, 0.04)',
                },
              }}
              onClick={() => ruleFileInput.current?.click()}
            >
              <input
                type="file"
                ref={ruleFileInput}
                style={{ display: 'none' }}
                accept=".csv"
                onChange={handleRuleFileUpload}
              />
              {rulePreview ? (
                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    {ruleFile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {rulePreview.totalRows} Rules Loaded
                  </Typography>
                  <Box sx={{ mt: 2, height: 300 }}>
                    <DataGrid
                      rows={rulePreview.rows}
                      columns={rulePreview.columns.map(col => ({
                        ...col,
                        flex: 1,
                        minWidth: 150,
                        renderCell: (params) => (
                          <Box sx={{ 
                            whiteSpace: 'normal',
                            wordWrap: 'break-word',
                            lineHeight: 1.2,
                            py: 1
                          }}>
                            {params.value}
                          </Box>
                        ),
                      }))}
                      pageSize={5}
                      rowsPerPageOptions={[5, 10, 25]}
                      pagination
                      paginationMode="client"
                      disableSelectionOnClick
                      sx={{
                        '& .MuiDataGrid-cell': {
                          fontSize: '0.875rem',
                          whiteSpace: 'normal',
                          lineHeight: 1.2,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                          bgcolor: 'background.default',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                        },
                      }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRuleFile(null);
                      setValidationRules([]);
                      setRulePreview(null);
                    }}
                  >
                    Change Rules
                  </Button>
                </Box>
              ) : (
                <Box>
                  <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
                  <Typography variant="body1" gutterBottom>
                    Drag and drop your rules CSV file here
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    or click to browse
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Start Analysis Button */}
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleAnalyze}
          disabled={!dataFile || validationRules.length === 0 || uploadProgress > 0}
          sx={{
            px: 6,
            py: 2,
            borderRadius: 2,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 12px 4px rgba(33, 203, 243, .4)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {uploadProgress > 0 ? (
            <>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Uploading files... {uploadProgress}%
              </Typography>
            </>
          ) : (
            <>
              <PlayArrowIcon sx={{ mr: 1 }} />
              Start Analysis
            </>
          )}
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography 
        variant="h3" 
        align="center" 
        gutterBottom
        sx={{
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}
      >
        Upload Your Data
      </Typography>
      <Typography 
        variant="h6" 
        align="center" 
        color="text.secondary" 
        sx={{ mb: 6 }}
      >
        Upload your financial data and validation rules to begin analysis
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 4,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {error}
        </Alert>
      )}

      {renderUploadSection()}
      {renderValidationOverlay()}
    </Container>
  );
};

export default UploadPage; 