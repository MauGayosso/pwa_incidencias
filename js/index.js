const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://user_admin:admin@market.phxils5.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function getCollection() {
    try {
        await client.connect();

        const db = client.db('incidencias');
        const collection = db.collection('reportes');
        const data = await collection.find({}).toArray();
        console.log(data);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

getCollection();
