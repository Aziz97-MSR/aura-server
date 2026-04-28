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
        const projectcollection = await client.db("aura").collection('projects')
        const navcollection = await client.db("aura").collection('nav')
        const footercollection = await client.db("aura").collection('footer')
        const welcomecollection = await client.db("aura").collection('welcome')
        const cvcollection = await client.db("aura").collection('cv')

        app.get('/about', async (req, res) => {
            const query = {}
            const cursour = aboutcollection.find(query)
            const aboutData = await cursour.toArray();
            res.send(aboutData)
        })

        app.get('/education', async (req, res) => {
            const query = {}
            const cursour = educationcollection.find(query)
            const educationData = await cursour.toArray();
            res.send(educationData)
        })

        app.get('/skills', async (req, res) => {
            const query = {}
            const cursour = skillcollection.find(query)
            const skillData = await cursour.toArray();
            res.send(skillData)
        })


        app.get('/experience', async (req, res) => {
            const query = {}
            const cursour = experiencecollection.find(query)
            const experienceData = await cursour.toArray();
            res.send(experienceData)
        })

        app.get('/award', async (req, res) => {
            const query = {}
            const cursour = awardcollection.find(query)
            const awardData = await cursour.toArray();
            res.send(awardData)
        })
        app.get('/hero', async (req, res) => {
            const query = {}
            const cursour = herocollection.find(query)
            const heroData = await cursour.toArray();
            res.send(heroData)
        }
        )
        app.get('/project', async (req, res) => {
            const query = {}
            const cursour = projectcollection.find(query)
            const projectData = await cursour.toArray();
            res.send(projectData)
        })

        app.get('/nav', async (req, res) => {
            const query = {}
            const cursour = navcollection.find(query)
            const navData = await cursour.toArray();
            res.send(navData)
        })

        app.get('/footer', async (req, res) => {
            const query = {}
            const cursour = footercollection.find(query)
            const footerData = await cursour.toArray();
            res.send(footerData)
        })
        app.get('/intro', async (req, res) => {
            const query = {}
            const cursour = welcomecollection.find(query)
            const introData = await cursour.toArray();
            res.send(introData)
        })

        app.get('/cv', async (req, res) => {
            const query = {}
            const cursour = cvcollection.find(query)
            const introData = await cursour.toArray();
            res.send(introData)
        })

        

        app.put('/about/:id', async (req, res) => {
            const id = req.params.id
            const updatedItem = req.body

            const options = { upsert: true };
            const filter = { _id: new ObjectId(id) };

            const updatedDoc = {
                $set: {
                    paragraph: updatedItem.paragraph
                }
            }
            const result = await aboutcollection.updateOne(filter, updatedDoc, options);

            res.send(result);
        })

        app.put('/cv/:id', async (req, res) => {
            const id = req.params.id
            const updatedItem = req.body

            const options = { upsert: true };
            const filter = { _id: new ObjectId(id) };

            const updatedDoc = {
                $set: {
                    link: updatedItem.link
                }
            }
            const result = await cvcollection.updateOne(filter, updatedDoc, options);

            res.send(result);
        })
        app.put('/footer/:id', async (req, res) => {
            const id = req.params.id
            const updatedItem = req.body
            const options = { upsert: true };
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    "grid1.paragraph": updatedItem.paragraph
                }
            }
            const result = await footercollection.updateOne(filter, updatedDoc, options);

            res.send(result);
        })


        app.put('/experience/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await experiencecollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        experience: newItem
                    }
                }
            );
            res.send(result)
        })

        app.put('/scocial/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await footercollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        "grid3.links": newItem
                    }
                }
            );
            res.send(result)
        })

        
        app.put('/education/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await educationcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        items: newItem
                    }
                }
            );
            res.send(result)
        })
        app.put('/skill/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await skillcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        items: newItem
                    }
                }
            );
            res.send(result)
        })
        app.put('/feature/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await projectcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        items: newItem
                    }
                }
            );
            res.send(result)
        })
        app.put('/award/:id', async (req, res) => {
            const id = req.params.id
            const newItem = req.body

            const result = await awardcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: {
                        items: newItem
                    }
                }
            );
            res.send(result)
        })


        app.put('/delete/award/:id/:name', async (req, res) => {
            const id = req.params.id
            const name = req.params.name

            const result = await awardcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $pull: {
                        items: { title: name }
                    }
                }
            );
            res.send(result)
        })


        app.put('/delete/experience/:id/:name', async (req, res) => {
            const id = req.params.id
            const name = req.params.name

            const result = await experiencecollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $pull: {
                        experience: { company: name }
                    }
                }
            );
            res.send(result)
        })


        app.put('/delete/education/:id/:name', async (req, res) => {
            const id = req.params.id
            const name = req.params.name

            const result = await educationcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $pull: {
                        items: { degree: name }
                    }
                }
            );
            res.send(result)
        })


        app.put('/delete/skill/:id/:name', async (req, res) => {
            const id = req.params.id
            const name = req.params.name

            const result = await skillcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $pull: {
                        items: { title: name }
                    }
                }
            );
            res.send(result)
        })

        app.put('/delete/feature/:id/:name', async (req, res) => {
            const id = req.params.id
            const name = req.params.name

            const result = await projectcollection.updateOne(
                { _id: new ObjectId(id) },
                {
                    $pull: {
                        items: { title: name }
                    }
                }
            );
            res.send(result)
        })

        app.put('/education/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await educationcollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "items.degree": name 
                },
                {
                    $set: {
                        "items.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });
        
        app.put('/detailes/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await footercollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "grid2.links.label": name 
                },
                {
                    $set: {
                        "grid2.links.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });

        app.put('/award/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await awardcollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "items.title": name 
                },
                {
                    $set: {
                        "items.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });


        app.put('/experience/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await experiencecollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "items.company": name 
                },
                {
                    $set: {
                        "items.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });

        app.put('/skill/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await skillcollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "items.title": name 
                },
                {
                    $set: {
                        "items.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });

        app.put('/feature/:id/:name', async (req, res) => {
            const id = req.params.id; 
            const name = req.params.name;
            const updatedData = req.body;

            const result = await projectcollection.updateOne(
                {
                    _id: new ObjectId(id),
                    "items.title": name 
                },
                {
                    $set: {
                        "items.$": { ...updatedData }
                    }
                }
            );
            res.send(result);
        });















    }
    finally {
        /* await client.close(); */
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send("Aura server is running")
})


app.listen(port, () => {
    console.log("Aura server is runnig in port : ", port);
})