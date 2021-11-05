const express = require('express');
const cors = require('cors');
const {MongoClient} = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.elw8g.mongodb.net/red-onion?retryWrites=true&w=majority`;
let client = new MongoClient(uri ,{useNewUrlParser:true, useUnifiedTopology: true})

async function run(){
    try{

    }
    finally{

    }
}
run().catch(console.dir);


app.listen(port, err => {
    err ? console.log(err) : console.log("Listing for port :" , port);
})