const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/', (req, res) => {
   res.status(200).send('hello world!');
});

app.get('/time', (req, res) => {
   let timeNow = Date(Date.now());
   res.status(200).send(timeNow.toString());
});


app.post('/logthis', (req, res) => {
   const name = req.body.name;
   const toLog = `\n >>> My name is ${name} <<< \n`
   console.info(toLog)
   res.status(200).send(toLog);
});

module.exports = app;