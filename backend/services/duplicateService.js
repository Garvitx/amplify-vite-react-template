// duplicateService.js
function checkForDuplicates(data) {
    const seen = new Set();
    const uniqueData = data.filter((item) => {
      const key = `${item.title}-${item.icon}`;
      return seen.has(key) ? false : seen.add(key);
    });
    return uniqueData;
  }
  
  module.exports = checkForDuplicates;
  