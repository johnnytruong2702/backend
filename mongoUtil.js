// backend/src/mongoUtil.js
const { MongoClient } = require('mongodb');
const uri = process.env.MONGODB_URI; // Use environment variable for MongoDB connection string

let client;

async function connect() {
  if (!client || !client.isConnected()) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
  }
  return client;
}

async function getDb() {
  if (!client || !client.isConnected()) {
    await connect();
  }
  return client.db(process.env.DATABASE_NAME); // Use environment variable for database name
}

module.exports = { connect, getDb };
