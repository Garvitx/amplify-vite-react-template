// mongoDataSource.js
const mongoose = require('mongoose');
const DataSource = require('./dataSource');

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  experience: String,
  details: String,
  similarJobs: [String],
});
const Job = mongoose.model('Job', jobSchema);

class MongoDataSourceJobs extends DataSource {
  async fetchData() {
    try {
      return await Job.find();
    } catch (error) {
      throw new Error('Failed to fetch data from MongoDB');
    }
  }
}

module.exports = MongoDataSourceJobs;
