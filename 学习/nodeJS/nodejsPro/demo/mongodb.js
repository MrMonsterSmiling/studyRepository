const MongoClient = require('mongodb').MongoClient;
//const {MongoClient} = require('mongodb');
const assert = require('assert');

//Connection URL
const url = 'mongodb://localhost:27017';
//Database Name
const dbName = 'temp';
//User connect method to connect to the server
MongoClient.connect(url,function(error,client){
    assert.equal(null,error);
    const db = client.db(dbName);
    
    client.close();
})