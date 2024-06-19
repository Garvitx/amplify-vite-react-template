const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');
const DataFetchingService = require('./services/dataFetchingServiceJobs');
const validateData = require('./services/validationServiceJobs');
const checkForDuplicates = require('./services/duplicateService');

const app = express();
const PORT = process.env.PORT2 || 5001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

app.get('/api/jobs', async (req, res) => {
  try {
    const dataSourceType = process.env.DATA_SOURCE_TYPE;
    const options = dataSourceType === 'csv' ? { filePath: process.env.CSV_FILE_PATH } : {};
    const dataFetchingService = new DataFetchingService(dataSourceType, options);

    let jobsData = await dataFetchingService.fetchData();

    jobsData.forEach(validateData);
    jobsData = checkForDuplicates(jobsData);

    res.json(jobsData);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
