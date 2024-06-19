const Ajv = require('ajv');
const ajv = new Ajv();

const jobSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    company: { type: 'string' },
    experience: { type: 'string' },
    details: { type: 'string' },
    similarJobs: {
      type: 'array',
      items: { type: 'string' }
    }
  },
  required: ['title', 'company', 'experience', 'details', 'similarJobs']
};

const validate = ajv.compile(jobSchema);

function validateData(data) {
  const valid = validate(data);
  if (!valid) {
    throw new Error('Invalid data format');
  }
}

module.exports = validateData;
