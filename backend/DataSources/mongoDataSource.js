// mongoDataSource.js
const mongoose = require('mongoose');
const DataSource = require('./dataSource');

const dashboardCardSchema = new mongoose.Schema({
  title: String,
  content: [String],
  icon: String,
});
const DashboardCard = mongoose.model('DashboardCard', dashboardCardSchema);

class MongoDataSource extends DataSource {
  async fetchData() {
    try {
      return await DashboardCard.find();
    } catch (error) {
      throw new Error('Failed to fetch data from MongoDB');
    }
  }
}

module.exports = MongoDataSource;
