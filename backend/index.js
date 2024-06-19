const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define the dashboard card schema and model
const dashboardCardSchema = new mongoose.Schema({
  title: String,
  content: [String],
  icon: String,
});
const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  experience: String,
  details: String,
  similarJobs: [String],
});
const DashboardCard = mongoose.model('DashboardCard', dashboardCardSchema);
const Job = mongoose.model('Job', jobSchema);

// const initialJobsData = [
//   { title: 'Software Engineer', company: 'Tech Corp', experience: '3-5 years', details: 'Full-stack development', similarJobs: ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer'] },
//   { title: 'Data Scientist', company: 'Data Solutions', experience: '2-4 years', details: 'Machine Learning and AI', similarJobs: ['Data Analyst', 'ML Engineer', 'AI Specialist'] },
//   { title: 'Product Manager', company: 'Innovate Ltd.', experience: '5-7 years', details: 'Product development and management', similarJobs: ['Project Manager', 'Product Owner', 'Business Analyst'] },
//   { title: 'DevOps Engineer', company: 'Cloud Solutions', experience: '3-6 years', details: 'CI/CD, Cloud Infrastructure', similarJobs: ['Site Reliability Engineer', 'System Administrator', 'Cloud Engineer'] },
//   { title: 'UX Designer', company: 'Creative Studio', experience: '2-4 years', details: 'User Experience Design', similarJobs: ['UI Designer', 'Product Designer', 'Interaction Designer'] },
//   { title: 'Sales Manager', company: 'Business Growth Inc.', experience: '4-7 years', details: 'Sales Strategy and Management', similarJobs: ['Account Manager', 'Sales Executive', 'Business Development Manager'] },
//   { title: 'HR Specialist', company: 'PeopleFirst', experience: '3-5 years', details: 'Human Resources Management', similarJobs: ['Recruiter', 'HR Generalist', 'Talent Acquisition Specialist'] },
//   { title: 'Marketing Coordinator', company: 'Market Movers', experience: '1-3 years', details: 'Marketing Campaign Coordination', similarJobs: ['Marketing Specialist', 'Content Coordinator', 'Digital Marketing Assistant'] },
//   { title: 'Finance Analyst', company: 'FinCorp', experience: '2-4 years', details: 'Financial Analysis and Reporting', similarJobs: ['Financial Advisor', 'Investment Analyst', 'Budget Analyst'] },
//   { title: 'Customer Support Representative', company: 'HelpDesk Solutions', experience: '0-2 years', details: 'Customer Service and Support', similarJobs: ['Technical Support', 'Customer Success Manager', 'Service Desk Analyst'] },
//   { title: 'Network Engineer', company: 'NetSecure', experience: '3-5 years', details: 'Network Design and Management', similarJobs: ['Network Administrator', 'Systems Engineer', 'IT Support Engineer'] },
// ];


// Uncomment the following code to populate the initial data (run once)
// Job.insertMany(initialJobsData)
//   .then(() => console.log('Initial job data inserted'))
//   .catch(err => console.error(err));

// Populate initial data (run once)
// const initialCardsData = [
//   {
//     title: 'Overall Summary',
//     content: [
//       'History of applications',
//       'Number of companies applied to',
//       'Jobs saved',
//       'Jobs followed up',
//       'Interviews scheduled',
//       'Offers received',
//     ],
//     icon: 'FaUserCircle',
//   },
//   {
//     title: 'Linked Accounts',
//     content: ['Upgrade your account for more features.', 'View linked accounts in a table format.'],
//     icon: 'FaBuilding',
//   },
//   {
//     title: 'Linked Companies',
//     content: ['List of companies you have linked to your profile, including EXL and others.'],
//     icon: 'FaBuilding',
//   },
//   {
//     title: 'My Job Postings',
//     content: ['Manage your job postings.', 'View and edit the jobs you have posted.'],
//     icon: 'FaBriefcase',
//   },
//   {
//     title: 'My Job Applications',
//     content: ['Track your job applications, their statuses, and related communications.'],
//     icon: 'FaFileAlt',
//   },
// ];

// Uncomment the following code to populate the initial data (run once)
// DashboardCard.insertMany(initialCardsData)
//   .then(() => console.log('Initial data inserted'))
//   .catch(err => console.error(err));

// Dashboard cards endpoint


app.get('/api/dashboard/cards', async (req, res) => {
  try {
    const cardsData = await DashboardCard.find();
    res.json(cardsData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard cards' });
  }
});

app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
