const express=require('express')
const connect=require('./config/db')
const cors=require('cors')
const coinRouter = require('./routes/coin.routes')
const app=express()

app.use(express.json())


app.use(cors())
require('dotenv').config()

app.get('/',(req,res)=>{
    try{
res.status(200).send("Welcome to My Tap me backend App")
    }catch{
res.status(400).send()
    }
})

const port=process.env.PORT || 5000
app.use('/',coinRouter)

app.listen(port, async () => {
    try {
      console.log("Server connecting to DataBase");
      await connect;
      console.log(`Server connected to DataBase Port:-${port}`);
    } catch (error) {
      console.log("Something Went Wrong:", error);
    }
  });
