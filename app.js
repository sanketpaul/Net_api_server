const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const Port = process.env.PORT || 4000
const cors = require('cors')
const fs = require('fs')
const morgan = require('morgan')
const mongo = require('mongodb')
let MongoClient = mongo.MongoClient;
let mongoUrl = process.env.MongoLive;
let db;


// middle wares
app.use(cors())
app.use(morgan('short', { stream: fs.createWriteStream('./app.logs') }))


app.get('/', (req, res) => {
    res.send('Hello viewers I am live')
})
app.get('/movies', (req, res) => {
    
    
    db.collection('movies').find().toArray((err, result) => {
        if (err) throw err
        res.send(result)
    })
})
app.get('/movies/:mid',(req,res)=>{
    let mid=Number(req.params.mid)

    db.collection('movies').find({id:mid}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})
app.get('/video/:vid',(req,res)=>{
    let vid =Number(req.params.vid)
    db.collection('movies').find({id:vid}).toArray((err,result)=>{
        if(err) throw err
        res.send(result)
    })
})






// connection with mongodb
MongoClient.connect(mongoUrl, (err, client) => {
    if (err) console.log("error while connecting")
    db = client.db('netflix')
    app.listen(Port, () => {
        console.log(`the server has successfully started at port ${Port}`)
    })
})
