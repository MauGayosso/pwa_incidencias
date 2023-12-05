const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://user_incidencias:buCygOKS3H9E4ejq@market.phxils5.mongodb.net/"

async function run(){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const db = client.db('incidencias');
        const collection = db.collection('reportes');

        const first = await collection.find({}).toArray();
        console.log("Retrieved Docuements");
        console.log(first);
    }
    finally {
        await client.close();
        console.log("Closed connection")
    }
}
run().catch(console.error);