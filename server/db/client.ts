import * as mongoDB from 'mongodb';

require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new mongoDB.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 2,
});

client.connect();

export default client;
