const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://user_admin:admin@market.phxils5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('incidencias');
    const collection = db.collection('reportes');
    const data = await collection.find({}).toArray();
    res.render('index', { data });
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/add', async (req, res) => {
  res.render('add');
});

app.get('/serviceWorker.js', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'service-worker.js'));
});

app.get('/manifest.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'manifest.json'));
});

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
/*
async function run() {
  try{
    await client.connect();
    const db = client.db('incidencias');
    const collection = db.collection('reportes');

    let reportDocument = {
      title: req.body.title,
      contract : req.body.contract,
      date: req.body.date,
      location: req.body.location,
      reports : req.body.hora.map((hora, i) => ({
        hora,
        description: req.body.descripcion[i],
      })),
      image: req.body.image,
    }
    const p = await collection.insertOne(reportDocument);
    }
    catch (e) {
      console.error(e);
    }
    finally {
      await client.close();
  }
}
*/
/*
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  title: String,
  contract: String,
  date: Date,
  location: String,
  reports: [{
    time : String,
    description: String,
  }],
  url_image: String,
});


app.post('/save', async (req, res) => {
  try{
    const newReport = new reportSchema({
      title: req.body.title,
      contract : req.body.contract,
      date: req.body.date,
      location: req.body.location,
      reports : [{}],
      url_image: req.body.image,
    });
    for (let i = 0; i < req.body.hora.length; i++) {
      newReport.reports.push({
        time: req.body.hora[i],
        description: req.body.descripcion[i],
      });
    }
    await newReport.save();}
  
    catch (e){
      console.error(e);
    }
    finally {
      await client.close();
    }
  });*/

app.post('/save', async (req, res) => {
  try {
    const newReport = {
      title: req.body.title,
      contract: req.body.contract,
      date: req.body.date,
      location: req.body.location,
      reports: [{
        time: req.body.hora[0].toString(),
        description: req.body.descripcion[0],
      }],
      url_image: req.body.image,
    }
    /*for (let i = 0; i < req.body.hora.; i++) {
      newReport.reports.push({
        time: req.body.hora[i],
        description: req.body.descripcion[i],
      });*/
     await collection.insertOne(newReport);
     console.log("Documento" + newReport);
    }
  catch (e) {
    console.error(e);
  }
  finally {
    await client.close();
  }
});

