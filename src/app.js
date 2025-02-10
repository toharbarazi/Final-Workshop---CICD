const express = require('express');
const path = require('path');
const data = require('./NamesDB.json');


// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// Random Name
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));

app.use('/random-name', (req, res) => {
  const {first_name} = data[Math.round(Math.random() * data.length)];
  const {last_name} = data[Math.round(Math.random() * data.length)];
  return res.json({first_name, last_name});
});

app.use('/', (req, res) => {
  return res.render('index');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);