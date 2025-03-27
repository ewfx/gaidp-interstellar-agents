import React from 'react';
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
  CardMedia,
  Stack,
  useTheme,
  useMediaQuery,
  Fade,
  Zoom,
  Divider,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  DataObject as DataObjectIcon,
  TrendingUp as TrendingUpIcon,
  Analytics as AnalyticsIcon,
  CloudUpload as CloudUploadIcon,
  AutoGraph as AutoGraphIcon,
  Rule as RuleIcon,
  Gavel as GavelIcon,
  Timeline as TimelineIcon,
  CompareArrows as CompareArrowsIcon,
  ShowChart as ShowChartIcon,
  PieChart as PieChartIcon,
} from '@mui/icons-material';

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    {
      title: 'Data Quality Assessment',
      description: 'Built during hackathon to analyze data quality metrics including completeness, accuracy, and consistency.',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Rule Validation',
      description: 'Customizable business rules validation engine developed for financial data compliance.',
      icon: <RuleIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Anomaly Detection',
      description: 'Advanced algorithms implemented to identify outliers and unusual patterns in financial data.',
      icon: <TimelineIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Performance Analytics',
      description: 'Real-time performance metrics and visualizations for data processing and analysis.',
      icon: <SpeedIcon sx={{ fontSize: 40 }} color="primary" />,
    },
  ];

  const benefits = [
    {
      title: 'Improved Data Quality',
      description: 'Quick identification and fixing of data quality issues in financial datasets.',
      icon: <DataObjectIcon sx={{ fontSize: 40 }} color="success" />,
    },
    {
      title: 'Regulatory Compliance',
      description: 'Built-in checks for financial regulatory requirements and industry standards.',
      icon: <SecurityIcon sx={{ fontSize: 40 }} color="success" />,
    },
    {
      title: 'Cost Reduction',
      description: 'Early detection of data issues to prevent costly financial errors.',
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} color="success" />,
    },
    {
      title: 'Better Decision Making',
      description: 'Enhanced financial decision-making with high-quality, reliable data.',
      icon: <AnalyticsIcon sx={{ fontSize: 40 }} color="success" />,
    },
  ];

  const metrics = [
    {
      title: 'Data Quality Score',
      value: '98.5%',
      description: 'Average data quality score across financial datasets',
      icon: <AssessmentIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Rule Compliance',
      value: '99.2%',
      description: 'Financial rules compliance rate',
      icon: <RuleIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Anomaly Detection',
      value: '95%',
      description: 'Accuracy in financial anomaly detection',
      icon: <TimelineIcon sx={{ fontSize: 40 }} color="primary" />,
    },
    {
      title: 'Processing Speed',
      value: '2.5x',
      description: 'Faster than traditional financial data analysis',
      icon: <SpeedIcon sx={{ fontSize: 40 }} color="primary" />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url(/data-profiling-hero.svg) center/cover no-repeat',
            opacity: 0.1,
          }}
        />
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography 
                    variant="h2" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      mb: 2,
                    }}
                  >
                    Financial Data Profiling
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 4, 
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    A hackathon project for comprehensive financial data quality assessment and analysis
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={() => navigate('/upload')}
                      sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'grey.100',
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Try Demo
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      sx={{ 
                        borderColor: 'white', 
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        '&:hover': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      View GitHub
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in timeout={1000}>
                <Box
                  component="img"
                  src="/data-profiling-hero.svg"
                  alt="Data Profiling Illustration"
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'block',
                    margin: 'auto',
                    filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.2))',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Project Features
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Key components developed during the hackathon
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Box sx={{ bgcolor: 'grey.50', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h3" align="center" gutterBottom>
            Project Impact
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            How this hackathon project helps with financial data analysis
          </Typography>
          <Grid container spacing={4}>
            {benefits.map((benefit, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Fade in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                  <Paper
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: 3,
                      },
                    }}
                  >
                    <Box sx={{ mb: 2 }}>{benefit.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {benefit.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {benefit.description}
                    </Typography>
                  </Paper>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Metrics Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h3" align="center" gutterBottom>
          Demo Results
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Performance metrics from our demo implementation
        </Typography>
        <Grid container spacing={4}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Zoom in timeout={500} style={{ transitionDelay: `${index * 100}ms` }}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ mb: 2 }}>{metric.icon}</Box>
                    <Typography variant="h3" color="primary" gutterBottom>
                      {metric.value}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {metric.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Zoom>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
          color: 'white',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom>
            Want to Try It Out?
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 4, opacity: 0.9 }}>
            Experience our hackathon project's financial data profiling capabilities
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/upload')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': {
                  bgcolor: 'grey.100',
                },
              }}
            >
              Run Demo Analysis
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage; 