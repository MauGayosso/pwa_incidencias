const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user_incidencias:buCygOKS3H9E4ejq@market.phxils5.mongodb.net/"
const client = new MongoClient(uri);

async function run(){
    try {
        await client.connect();
        const db = client.db('incidencias');
        const collection = db.collection('reportes');

        const first = await collection.find();
        console.log(first);
    }
    finally {
        await client.close();
    }
}
run().catch(console.error);