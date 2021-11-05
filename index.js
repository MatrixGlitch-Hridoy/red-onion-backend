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
        await client.connect();
        const database = client.db('red-onion');
        const foodCollection = database.collection('foods');
        const featureCollection = database.collection('features');
        const orderCollection = database.collection('orders');

        //Get All Foods 
        app.get('/foods' , async (req, res) => {
            const cursor = foodCollection.find({});
            const foods = await cursor.toArray();
            res.send(foods);
        })

        //Get Foods by id
        app.get('/food/:id', async (req,res) => {
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const food = await foodCollection.findOne(query);
            res.json(food);
        })

        //Get Features
        app.get('/features' , async (req,res) => {
            const cursor = featureCollection.find({});
            const features = await cursor.toArray();
            res.send(features);
        })
    }
    finally{

    }
}
run().catch(console.dir);

app.get('/' , (req, res) => {
    res.send("Welcome to Red Onion Backend Server");
})
app.listen(port, err => {
    err ? console.log(err) : console.log("Listing for port :" , port);
})