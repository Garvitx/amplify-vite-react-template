// validationService.js
const Ajv = require('ajv');
const ajv = new Ajv();

const cardSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    content: { type: 'array', items: { type: 'string' } },
    icon: { type: 'string' },
  },
  required: ['title', 'content', 'icon'],
};

const validate = ajv.compile(cardSchema);

function validateData(data) {
  const valid = validate(data);
  if (!valid) {
    throw new Error('Invalid data format');
  }
}

module.exports = validateData;
