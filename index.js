const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1cvgdrp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    const freaserJobCollection = client.db("JobLab").collection("freaserjon");
    const experianceJobCollection = client.db("JobLab").collection("experianceJob");
    const itComapanyCollection = client.db("JobLab").collection("ITCompany");


    app.get('/freaser', async (req, res) => {
        const result = await freaserJobCollection.find().toArray();
        res.send(result);
    })
    app.get('/experiance', async (req, res) => {
        const result = await experianceJobCollection.find().toArray();
        res.send(result);
    })
    app.get('/itcompany', async (req, res) => {
      const result = await itComapanyCollection.find().toArray();
      res.send(result);
  })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('hi')
  })
  
  app.listen(port, () => {
    console.log(`Mind ${port}`)
  })