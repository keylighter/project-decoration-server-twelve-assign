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

async function run() {

    try {
        await client.connect();

        const database = client.db("Decoration");
        const productCollection = database.collection("products");

        //get api

        app.get('/products', async (req, res) => {
            const cursor = productCollection.find({});

            const products = await cursor.limit(6).toArray();
            // console.log(products);
            res.send(products);
        })
        app.get('/exploreproducts', async (req, res) => {
            const cursor = productCollection.find({});

            const exploreProducts = await cursor.toArray();
            // console.log(products);
            res.send(exploreProducts);
        })
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
    console.log(`Example app listening at ${port}`)
});