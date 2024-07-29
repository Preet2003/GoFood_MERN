// express js setup

const express = require('express')
const app = express()

// keep this port different from the one selected for the frontend (react app)
// we have selected 3000 for the frontend, so we will select 5000 for the backend
const port = process.env.PORT || 5000;

const mongoDB = require('./db');
mongoDB();

// cors => cross origin resource sharing
// ensure no cors error occurs
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// to parse the incoming request with JSON payloads
// acts as a middleware in the request-response cycle

// iske bina kaam nahi hoga because we are sending data in json format and we need to parse that data this will parse the incoming request with JSON payloads
app.use(express.json());

// now end point becomes : localhost:5000/api/createUser
app.use('/api', require('./routes/CreateUser'));

// now end point becomes : localhost:5000/api/DisplayData
app.use('/api', require('./routes/DisplayData'));

app.use('/api', require('./routes/OrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
