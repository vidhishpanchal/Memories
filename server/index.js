// const express = require("express")
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });
import express from "express"
import bodyParser from 'body-parser' 
import mongoose from "mongoose"
// const cors = require('cors');
import cors from "cors"
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))})
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
// const express = require('express')
// const mongoose = require("mongoose")
// const cors = require("cors")
// const bodyParser = require("body-parser")
// const postRoutes = require("./routes/posts") 
// const app = express()

// const PORT = process.env.PORT || 5000

// app.use(bodyParser.json({limit:"30mb", extended: true}))
// app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
// app.use(cors());
// app.use("/posts", postRoutes)
// const CONNECTION_URL = "mongodb+srv://Vidhish:memories123@cluster0.oh3m5.mongodb.net/Memories?retryWrites=true&w=majority"
// mongoose.connect(CONNECTION_URL, 
//     {useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false})
//     .then(()=>{
//         console.log("Connected to MongoDB");
//         app.listen(PORT, (req, res)=>{
//             console.log(`Server connected to port ${PORT}`);
//         })
       
//     })
//     .catch((err)=>{
//         console.log("Error : ", err);
//     })
 
    