const express = require('express')
const app = express();
const dotenv = require('dotenv');
const port = process.env.PORT || 8000;

dotenv.config();

app.use(express.json());
const db = require('./config/db');

app.use("/api/v1", require("./router"));

app.listen(port, () => {
    console.log(`App are listing on ${port}`)
  })