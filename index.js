const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 5000;


// middleware 

app.use(cors());
app.use(express.json());

// mongodb
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@aster.gyayqwe.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const meetchatCollection = client.db('meetchat').collection('posts')

        // posts

        app.post('/posts', async (req, res) => {
            const posts = req.body;
            const result = await meetchatCollection.insertOne(posts);
            res.send(result)
        });

        app.get('/allPosts', async (req, res) => {
            const query = {};
            const allPosts = await meetchatCollection.find(query).toArray();
            res.send(allPosts)
        });

        app.get('/topPosts', async (req, res) => {
            const query = { likes: { $lt: 500 } };
            const topPosts = await meetchatCollection.find(query).toArray();
            res.send(topPosts)
        });
    }
    finally {

    }
}
run().catch(() => console.log())



app.get('/', async (req, res) => {
    res.send('MeetChat server is running...')
})

app.listen(port, () => {
    console.log(`MeetChat server running on ${port}`)
})