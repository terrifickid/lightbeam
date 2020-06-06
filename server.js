////////////////////////////////////
//Orderwrite Backend server
console.log('init');

//Express Framework
const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static('assets'));

//mongodb
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dbHost = 'mongodb://dev:dev123@ds363088.mlab.com:63088/orderwrite-dev';
let dbClient;


async function init(){
  try {
//DB CONNECT
    //Connect to DB Server
    console.log('Connecting to db...');
    dbClient = await MongoClient.connect(dbHost, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('db Connected!');
    //Access Database
    var db = dbClient.db('orderwrite-dev');

//ENDPOINTS
    //Return Collection List
    app.get('/:collection', async function(req, res) {
      const col = db.collection(req.params.collection);
      const docs = await col.find().toArray();
      res.json(docs);
    });
    //Return Collection Record by id
    app.get('/:collection/:id', async function(req, res) {
      const id = mongo.ObjectId(req.params.id);
      const col = db.collection(req.params.collection);
      const docs = await col.find({'_id': id}).toArray();
      res.json(docs);
    });
    //Find in Collection
    app.post('/:collection', async function(req, res) {
      const col = db.collection(req.params.collection);
      const docs = await col.find(req.body).toArray();
      res.json(docs);
    });

    //Listen
    app.listen(port, () => console.log(`Orderwrite server listening at http://localhost:${port}`))

  }catch(err){
    console.log(err);
  }


}

//Initialize App
init();

// listen for the signal interruption (ctrl-c)
process.on('SIGINT', async () => {
  await dbClient.close();
  console.log('db disc. exiting...');
  process.exit();
});
