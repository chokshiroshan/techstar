/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

if (!global.gConfig.database_conn) {
  console.error('please provide database_conn in config file...');
}

const initDB = () => {
  mongoose.connect(global.gConfig.database_conn, global.gConfig.options, (err) => {
    if (err) {
      console.log(err);
      console.log('MongoDB Connection Failed');
    } else {
      console.log('MongoDB Connected');
    }
  });
  mongoose.set('debug', true);
};
module.exports = {
  initDB,
};
