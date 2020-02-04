require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function() {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', function() {
    console.log('Mongoose default connection is open to ', process.env.DB);
  });

  db.on('error', function(err) {
    console.log('Mongoose default connection has occured ' + err + ' error');
  });

  db.on('disconnected', function() {
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', function() {
    db.close(function() {
      console.log(
        'Mongoose default connection is disconnected due to application termination'
      );
      process.exit(0);
    });
  });
};
