const mongoose = require('mongoose');

const db = mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
  console.log("sucessfully connect to the db");
})
.catch((err)=>{
    console.log(err)
})

module.exports = db;