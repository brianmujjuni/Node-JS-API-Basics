const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const feedRoutes = require("./routes/feed");

const app = express();

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use('/images',express.static(path.join(__dirname,'images')))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/feed", feedRoutes);

//error handling
app.use((error,req,res,next)=>{
  const status = error.statuCode || 500
  const message = error.message
  res.status(status).json({message: message})
})

const dbUrl = process.env.DB
mongoose
  .connect(dbUrl)
  .then((restult) => {
    app.listen(8080);
  }).catch(err => console.log(err))
  

