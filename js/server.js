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

app.post('/save', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('incidencias');
    const collection = db.collection('reportes');
    var temp = req.body.titulo;
    console.log('title: ' + temp);
    const newReport = {
      title: req.body.titulo,
      contract: req.body.contrato,
      date: req.body.fecha,
      location: req.body.ubicacion,
      reports: [{
        time: req.body.hora[0].toString(),
        description: req.body.descripcion[0],
      }],
      url_image: req.body.imagen,
    }
    for (let i = 0; i < req.body.hora; i++) {
      newReport.reports.push({
        time: req.body.hora[i],
        description: req.body.descripcion[i],
      });
    await collection.insertOne(newReport);
     console.log("Documento" + newReport);
     res.redirect('/');
    }}
  catch (e) {
    console.error(e);
  }
  finally {
    //await client.close();
  }
});

