const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv').config(); 
const app = express()
const customer=require("./models/customer.js")
const cors=require("cors")

try {
  //console.log(process.env.MONGOURI)
  mongoose.connect("mongodb+srv://Nasir:gq4ib3Z0K8BAdCGR@cluster0.tq6a7.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("db connect")
  })
} catch {
  console.log('ERROR')
}

app.use(express.json({ extended: false }))
app.use(cors())
app.post("/add",async(req,res)=>{
  const curr = new customer({name:req.body.name, email:req.body.email||"test@gmail.com", balance:req.body.balance});
  await curr.save()
  res.json(curr)
})
app.use('/api/customers', require('./routes/customers'))
app.use('/api/transaction', require('./routes/transactions'))

app.use(express.static(path.join(__dirname, 'client', 'public')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'public', 'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
 