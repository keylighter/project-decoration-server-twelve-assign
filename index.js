const express = require('express');
// const admin = require("firebase-admin");
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');

const port = process.env.PORT || 5000;


//
app.use(cors());
//
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.u7kce.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//heroku link
// https://lit-plains-82210.herokuapp.com/products

async function run() {

    try {
        await client.connect();

        const database = client.db("Decoration");
        const productCollection = database.collection("products");

        const orderCollection = database.collection("orders");

        //get api

        //get orders list according to user email 
        app.get('/orders', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }

            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.json(orders);
        })

        //show 6 products and all products
        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});

            const products = await cursor.toArray();
            // console.log(products);
            res.send(products);

        });


        // posting -orders

        app.post('/orders', async (req, res) => {
            const order = req.body;

            const result = await orderCollection.insertOne(order);

            console.log(result);
            res.json(result);
        });



    }
    finally {
        // await client.close();
    }

}

run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello decoratorsss!')
});

app.listen(port, () => {
    console.log(`Example app listening at mmmmm aaa ${port}`)
});