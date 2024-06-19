// dataFetchingService.js
const MongoDataSource = require('../DataSources/mongoDataSource');
const CSVDataSource = require('../DataSources/csvDataSource');

class DataFetchingService {
  constructor(dataSourceType, options = {}) {
    switch (dataSourceType) {
      case 'mongodb':
        this.dataSource = new MongoDataSource();
        break;
      case 'csv':
        this.dataSource = new CSVDataSource(options.filePath);
        break;
      default:
        throw new Error('Invalid data source type');
    }
  }

  async fetchData() {
    return await this.dataSource.fetchData();
  }
}

module.exports = DataFetchingService;
