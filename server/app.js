const express = require('express');
const mongodb = require('mongodb');

const app = express();
const port = 3000;

const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://rapolunagarjuna:test1234@users.pbb8cbh.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(uri, function(err, client) {
  if (err) throw err;
  console.log('Connected to MongoDB Atlas cluster');

  const db = client.db('test');

  // Define routes and middleware here
  // ...

  app.listen(port, function() {
    console.log(`App listening on port ${port}`);
  });
});
