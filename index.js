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


        // ==========================================
        // SECTION 1: SINGULAR DOCUMENT UPDATES
        // (For top-level properties and single objects)
        // ==========================================

        // Update Hero (Dynamic fields with nested object support)
        app.put('/hero/:id', async (req, res) => {
            const id = req.params.id;
            const updatedData = { ...req.body };
            delete updatedData._id; // Protect main ID

            const updateFields = {};
            for (const key in updatedData) {
                if (typeof updatedData[key] === 'object' && updatedData[key] !== null) {
                    for (const nestedKey in updatedData[key]) {
                        updateFields[`${key}.${nestedKey}`] = updatedData[key][nestedKey];
                    }
                } else {
                    updateFields[key] = updatedData[key];
                }
            }

            const result = await herocollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: updateFields },
                { upsert: true }
            );
            res.send(result);
        });

        // Update About
        app.put('/about/:id', async (req, res) => {
            const result = await aboutcollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { paragraph: req.body.paragraph } },
                { upsert: true }
            );
            res.send(result);
        });

        // Update CV
        app.put('/cv/:id', async (req, res) => {
            const result = await cvcollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: { link: req.body.link } },
                { upsert: true }
            );
            res.send(result);
        });

        // Update Nav
        app.put('/nav/:id', async (req, res) => {
            const updatedData = { ...req.body };
            delete updatedData._id;
            const result = await navcollection.updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: updatedData },
                { upsert: true }
            );
            res.send(result);
        });



        // ==========================================
        // SECTION 2: ARRAY ITEM MANAGEMENT (Add, Edit, Delete)
        // ==========================================

        // A helper function to create safe dynamic update queries for arrays
        const buildArrayUpdateFields = (arrayName, body) => {
            const updatedData = { ...body };
            delete updatedData.id; // Protect nested ID
            const updateFields = {};
            for (const key in updatedData) {
                updateFields[`${arrayName}.$.${key}`] = updatedData[key];
            }
            return updateFields;
        };

        // --- EXPERIENCE ---
        app.put('/experience/:docId', async (req, res) => {
            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString(); // Auto-generate ID on Backend

            const result = await experiencecollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $push: { experience: newItem } }
            );
            res.send(result);
        });
        app.put('/experience/:docId/:itemId', async (req, res) => {
            const result = await experiencecollection.updateOne(
                { _id: new ObjectId(req.params.docId), "experience.id": req.params.itemId },
                { $set: buildArrayUpdateFields("experience", req.body) }
            );
            res.send(result);
        });
        app.delete('/experience/:docId/:itemId', async (req, res) => {
            const result = await experiencecollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $pull: { experience: { id: req.params.itemId } } }
            );
            res.send(result);
        });

        // --- AWARDS ---
        app.put('/award/:docId', async (req, res) => {
            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString(); // Auto-generate ID on Backend

            const result = await awardcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $push: { items: newItem } }
            );
            res.send(result);
        });
        app.put('/award/:docId/:itemId', async (req, res) => {
            const result = await awardcollection.updateOne(
                { _id: new ObjectId(req.params.docId), "items.id": req.params.itemId },
                { $set: buildArrayUpdateFields("items", req.body) }
            );
            res.send(result);
        });
        app.delete('/award/:docId/:itemId', async (req, res) => {
            const result = await awardcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $pull: { items: { id: req.params.itemId } } }
            );
            res.send(result);
        });


        // --- EDUCATION ---
        app.put('/education/:docId', async (req, res) => {
            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString(); // Auto-generate ID on Backend

            const result = await educationcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $push: { items: newItem } }
            );
            res.send(result);
        });
        app.put('/education/:docId/:itemId', async (req, res) => {
            const result = await educationcollection.updateOne(
                { _id: new ObjectId(req.params.docId), "items.id": req.params.itemId },
                { $set: buildArrayUpdateFields("items", req.body) }
            );
            res.send(result);
        });
        app.delete('/education/:docId/:itemId', async (req, res) => {
            const result = await educationcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $pull: { items: { id: req.params.itemId } } }
            );
            res.send(result);
        });


        // --- SKILLS ---
        app.put('/skill/:docId', async (req, res) => {
            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString(); // Auto-generate ID on Backend

            const result = await skillcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $push: { items: newItem } }
            );
            res.send(result);
        });
        app.put('/skill/:docId/:itemId', async (req, res) => {
            const result = await skillcollection.updateOne(
                { _id: new ObjectId(req.params.docId), "items.id": req.params.itemId },
                { $set: buildArrayUpdateFields("items", req.body) }
            );
            res.send(result);
        });
        app.delete('/skill/:docId/:itemId', async (req, res) => {
            const result = await skillcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $pull: { items: { id: req.params.itemId } } }
            );
            res.send(result);
        });


        // --- FEATURES (PROJECTS) ---
        app.put('/feature/:docId', async (req, res) => {
            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString(); // Auto-generate ID on Backend

            const result = await projectcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $push: { items: newItem } }
            );
            res.send(result);
        });
        app.put('/feature/:docId/:itemId', async (req, res) => {
            const result = await projectcollection.updateOne(
                { _id: new ObjectId(req.params.docId), "items.id": req.params.itemId },
                { $set: buildArrayUpdateFields("items", req.body) }
            );
            res.send(result);
        });
        app.delete('/feature/:docId/:itemId', async (req, res) => {
            const result = await projectcollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $pull: { items: { id: req.params.itemId } } }
            );
            res.send(result);
        });


        // ==========================================
        // UNIFIED FOOTER ROUTES (/footer/...)
        // ==========================================

        // Helper to map the URL section to the exact MongoDB array path
        const getGridPath = (section) => {
            if (section === 'details') return 'grid2.links';
            if (section === 'social') return 'grid3.links';
            return null; // Prevents updating invalid paths
        };

        // 1. UPDATE GRID 1 (And other top-level grid headings)
        app.put('/footer/:docId', async (req, res) => {
            const updatedData = { ...req.body };
            delete updatedData._id;

            // Since the frontend is already sending exact MongoDB paths 
            // (e.g., {"grid1.paragraph": "New text", "grid2.heading": "DETAILS"}),
            // we can pass the data directly into $set!
            const result = await footercollection.updateOne(
                { _id: new ObjectId(req.params.docId) },
                { $set: updatedData }
            );
            res.send(result);
        });

        // 2. ADD ITEM TO ARRAY (Details or Social)
        // URL Example: PUT /footer/69e0...de2/details  OR  /footer/69e0...de2/social
        app.put('/footer/:docId/:section', async (req, res) => {
            const { docId, section } = req.params;
            const arrayPath = getGridPath(section);

            if (!arrayPath) return res.status(400).send({ error: "Invalid section" });

            const newItem = req.body;
            if (!newItem.id) newItem.id = Date.now().toString();

            const result = await footercollection.updateOne(
                { _id: new ObjectId(docId) },
                { $push: { [arrayPath]: newItem } }
            );
            res.send(result);
        });

        // 3. EDIT ITEM IN ARRAY (Details or Social)
        // URL Example: PUT /footer/69e0...de2/details/1
        app.put('/footer/:docId/:section/:itemId', async (req, res) => {
            const { docId, section, itemId } = req.params;
            const arrayPath = getGridPath(section);

            if (!arrayPath) return res.status(400).send({ error: "Invalid section" });

            const updatedData = { ...req.body };
            delete updatedData.id;

            const updateFields = {};
            for (const key in updatedData) {
                updateFields[`${arrayPath}.$.${key}`] = updatedData[key];
            }

            const result = await footercollection.updateOne(
                { _id: new ObjectId(docId), [`${arrayPath}.id`]: itemId },
                { $set: updateFields }
            );
            res.send(result);
        });

        // 4. DELETE ITEM FROM ARRAY (Details or Social)
        // URL Example: DELETE /footer/69e0...de2/social/2
        app.delete('/footer/:docId/:section/:itemId', async (req, res) => {
            const { docId, section, itemId } = req.params;
            const arrayPath = getGridPath(section);

            if (!arrayPath) return res.status(400).send({ error: "Invalid section" });

            const result = await footercollection.updateOne(
                { _id: new ObjectId(docId) },
                { $pull: { [arrayPath]: { id: itemId } } }
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