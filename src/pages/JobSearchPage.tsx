import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import axios from 'axios';

interface Job {
  _id: string;
  title: string;
  company: string;
  experience: string;
  details: string;
  similarJobs: string[];
}

const JobSearchPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs');
        setJobs(response.data);
      } catch (err) {
        console.error('Failed to fetch jobs', err);
      }
    };

    fetchJobs();
  }, []);

  const handleJobClick = (job: Job) => {
    setSelectedJob(job);
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Job Listings</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {jobs.map((job) => (
            <Paper
              key={job._id}
              sx={{ p: 2, mb: 2, cursor: 'pointer' }}
              onClick={() => handleJobClick(job)}
            >
              <Typography variant="h6">{job.title}</Typography>
              <Typography variant="body1">{job.company}</Typography>
              <Typography variant="body2">Experience: {job.experience}</Typography>
              <Typography variant="body2">Details: {job.details}</Typography>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={6}>
          {selectedJob ? (
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6">Job Details</Typography>
              <Typography variant="body1">Position: {selectedJob.title}</Typography>
              <Typography variant="body1">Company: {selectedJob.company}</Typography>
              <Typography variant="body2">Experience: {selectedJob.experience}</Typography>
              <Typography variant="body2">Details: {selectedJob.details}</Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2, mr: 1 }}>Action 1</Button>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>Action 2</Button>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="subtitle1">Other Similar Jobs:</Typography>
                {selectedJob.similarJobs.map((job, index) => (
                  <Typography key={index} variant="body2">{job}</Typography>
                ))}
              </Box>
            </Paper>
          ) : (
            <Typography variant="body1">Select a job to view details</Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default JobSearchPage;
