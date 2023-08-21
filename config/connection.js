const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URL || 'mongodb://104.2.182.56/32';

connect(connectionString);

module.exports = connection;