require('dotenv').config();
const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Mongoose default connection is open to ', process.env.DB);
  });

  db.on('error', err => {
    console.log('Mongoose default connection has occured ' + err + ' error');
  });

  db.on('disconnected', () => {
    console.log('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', () => {
    db.close(() => {
      console.log(
        'Mongoose default connection is disconnected due to application termination'
      );
      process.exit(0);
    });
  });
};
