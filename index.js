const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 8000;
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://msraziz97_db_user:l08VXQsxPi1dGCPH@authority-ledger.vworqap.mongodb.net/?appName=Authority-Ledger`;

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
    const herocollection = await client.db("aura").collection('home')
    const projectcollection = await client.db("aura").collection('project')
    const navcollection = await client.db("aura").collection('nav')
    const footercollection = await client.db("aura").collection('footer')
    const welcomecollection = await client.db("aura").collection('welcome')

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
    app.get('/hero', async(req, res)=>
    {
        const query = {}
        const cursour = herocollection.find(query)
        const heroData = await cursour.toArray();
        res.send(heroData)
    }
)
    app.get('/award', async(req, res)=>
    {
        const query = {}
        const cursour = projectcollection.find(query)
        const projectData = await cursour.toArray();
        res.send(projectData)
    })

    app.get('/nav', async(req, res)=>
    {
        const query = {}
        const cursour = navcollection.find(query)
        const navData = await cursour.toArray();
        res.send(navData)
    })

    app.get('/footer', async(req, res)=>
    {
        const query = {}
        const cursour = footercollection.find(query)
        const footerData = await cursour.toArray();
        res.send(footerData)
    })
    app.get('/intro', async(req, res)=>
    {
        const query = {}
        const cursour = welcomecollection.find(query)
        const introData = await cursour.toArray();
        res.send(introData)
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