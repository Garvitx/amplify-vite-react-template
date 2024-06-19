// csvDataSource.js
const csv = require('csv-parser');
const fs = require('fs');
const DataSource = require('./dataSource');

class CSVDataSource extends DataSource {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async fetchData() {
    return new Promise((resolve, reject) => {
      const results = [];
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => reject(error));
    });
  }
}

module.exports = CSVDataSource;
