/* eslint-disable linebreak-style */
/* eslint-disable global-require */
const http = require('http');
require('./config');
const { initDB } = require('./db');

//  App Config
const app = require('./app');

const port = process.env.PORT || '3001';
app.set('port', port);
const server = http.createServer(app);

// const { createKafkaTopics } = require('./util/kafka/topics');

//  DB Config
initDB();
// createKafkaTopics();

//  Listener
server.listen(port, (err) => {
  if (err) console.error(err);
  else console.log(`Server listening on ${server.address().port}`);
});
