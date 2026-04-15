const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@authority-ledger.vworqap.mongodb.net/?appName=Authority-Ledger`;

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

    
    const aboutcollection = await client.db("aura").collection('about')
    const experiencecollection = await client.db("aura").collection('experience')
    const awardcollection = await client.db("aura").collection('awards')
    const educationcollection = await client.db("aura").collection('education')
    const skillcollection = await client.db("aura").collection('skills')

    app.get('/about', async(req, res)=>
    {
        const query = {}
        const cursour = aboutcollection.find(query)
        const aboutData = await cursour.toArray();
        res.send(aboutData)
    })

    app.get('/education', async(req, res)=>
    {
        const query = {}
        const cursour = educationcollection.find(query)
        const educationData = await cursour.toArray();
        res.send(educationData)
    })

    app.get('/skills', async(req, res)=>
    {
        const query = {}
        const cursour = skillcollection.find(query)
        const skillData = await cursour.toArray();
        res.send(skillData)
    })

    
    app.get('/experience', async(req, res)=>
    {
        const query = {}
        const cursour = experiencecollection.find(query)
        const experienceData = await cursour.toArray();
        res.send(experienceData)
    })

    app.get('/award', async(req, res)=>
    {
        const query = {}
        const cursour = awardcollection.find(query)
        const awardData = await cursour.toArray();
        res.send(awardData)
    })





    } 
   finally {
        /* await client.close(); */
    }
}
run().catch(console.dir);

app.get('/' , (req , res)=>
{
    res.send("Aura server is running")
})

app.listen(port, () => {
    console.log("Aura server is runnig in port : ", port);
})