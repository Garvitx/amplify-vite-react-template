import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FaUserCircle, FaBuilding, FaBriefcase, FaFileAlt } from 'react-icons/fa';

const DashboardCard = ({ title, content, icon }) => {
  const iconComponents = {
    FaUserCircle: <FaUserCircle size={30} />,
    FaBuilding: <FaBuilding size={30} />,
    FaBriefcase: <FaBriefcase size={30} />,
    FaFileAlt: <FaFileAlt size={30} />,
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box display="flex" alignItems="center" mb={2}>
          {icon && (
            <Box color="primary.main" sx={{ mr: 2 }}>
              {iconComponents[icon]}
            </Box>
          )}
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        </Box>
        <Box component="ul" sx={{ listStyleType: 'decimal', pl: 2 }}>
          {content.map((item, index) => (
            <Typography component="li" variant="body2" color="textSecondary" key={index}>
              {item}
            </Typography>
          ))}
        </Box>
      </CardContent>
      <Box textAlign="right" p={2}>
        <Button variant="contained" color="primary" size="small">
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default function AppView() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/cards');
        setCardsData(response.data);
      } catch (error) {
        console.error('Error fetching cards data:', error);
      }
    };

    fetchCardsData();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Account Summary
      </Typography>
      <Grid container spacing={3}>
        {cardsData.map((card, index) => (
          <Grid key={index} xs={12} md={6}>
            <DashboardCard title={card.title} content={card.content} icon={card.icon} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
