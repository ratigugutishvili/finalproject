const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require("cors");
const User = require('./modules/user');
const Expense = require('./modules/expense');
const storage = require('node-sessionstorage')
app = express()
const bodyParser = require('body-parser');

const corsOpt = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOpt));
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
require('./db')

const tokenMiddleware = (req,res,next)=>{
    const token = JSON.parse(req.headers['authorization'])

    if(!token){
        res.status(400)
        res.json({message:"no token"})
        return
    }
    const result = verifyAccessToken(token);
    if(!result.success){
        res.status(400)
        res.json({message:'not good token'})
        return
    }


    next()
}


app.post('/signin',async (req,res)=>{
    const body = req.body
    
    const currentUser = await User.findOne({email:body.email})


    if(!currentUser){
        res.status(400)
        res.json({email:'not'})
        return
    }

    if (currentUser.password !== body.password) {
        res.status(400)
        res.json({pass:'not'})
        return
    }

    const key = generateAccessToken(currentUser)



    res.json({token:key})
    res.status(200)
})

app.post('/register',async (req,res)=>{
    const body = req.body
    const users = await User.find()

    const emailcheck = users.find(el=>{
        return el.email == body.email 
    })
    if (emailcheck) {
        res.json({mailerror:'email already used'})
        res.status(400)
        return
    }

    if(body.password.length < 8){
        res.json({passerror:'password is short'})
        res.status(400)
        return
    }

    const newUser = new User
    newUser.username = body.username
    newUser.email = body.email
    newUser.password = body.password

    await newUser.save()
    res.status(200)
    res.send({ok:true})
})

app.post('/add',tokenMiddleware,(req,res)=>{
    const token = JSON.parse(req.headers['authorization'])
    const { createdAt ,category, type ,amount } = req.body
    const userId = verifyAccessToken(token).data.id
    
    const newexpense = new Expense
    newexpense.createdAt = createdAt
    newexpense.category = category
    newexpense.type = type
    newexpense.amount = amount
    newexpense.userId = userId

    newexpense.save()

    res.json({true:'okj'})
    res.status(200)
})

app.get('/session', tokenMiddleware, async (req,res)=>{
    const token = JSON.parse(req.headers['authorization'])
    const userId = verifyAccessToken(token).data.id

    const expenses = await Expense.find({userId:userId})

    res.json({expenses:expenses})
    res.status(200)
})

app.put('/edit/:expenseid',tokenMiddleware,async(req,res)=>{

    const expenseid = req.params.expenseid

    const result = await Expense.updateOne(
        {_id:expenseid},
        {$set:req.body},
        { upsert: false }
    )

    res.status(200)
    res.json({message:expenseid})
})

app.get('/editF/:expenseid',async(req,res)=>{
    const expensid = req.params.expenseid
    const expense = await Expense.findOne({_id:expensid})
    res.json(expense)
    res.status(200)
})

app.delete('/delete/:expenseId', tokenMiddleware, async (req,res)=>{
    const expensId = req.params.expenseId
    await Expense.deleteOne({_id:expensId})
    res.json({id: expensId})
    res.status(200)
})

app.post('/filter', tokenMiddleware, async(req,res)=>{
    const token = JSON.parse(req.headers['authorization'])
    const userId = verifyAccessToken(token).data.id
    const body = req.body
    if (!body.min && !body.max) {
        res.status(400)
        res.json({messageEror:'need to fil all fields'})
        return
    }
    const filteredexpenses = await Expense.find({
        userId: userId,
        amount: {$gte: body.min,$lte: body.max}
    })

    console.log(filteredexpenses);
    console.log(body);
    res.status(200)
    res.json({message:filteredexpenses})
})


app.listen(3001,(req,res)=>{
    console.log('running on 3001');
})


















function generateAccessToken(user) {
    const payload = {
      id: user._id,
    };
    
    const secret = '123';
    const options = { expiresIn: '1h' };
  
    return jwt.sign(payload, secret, options);
  }
  function verifyAccessToken(token) {
    const secret = '123';
  
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }