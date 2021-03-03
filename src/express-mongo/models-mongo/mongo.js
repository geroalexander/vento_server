const mongoose = require('mongoose');

const server = 'localhost:27017';
const database = 'vento';

exports.connection = mongoose.connect(`mongodb://${server}/${database}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
