const express = require('express');
const cors = require('cors');
require('./config');
const User = require('./user');
const Product = require('./product');
const jwt = require('jsonwebtoken')
const jwtKey = 'first-key'
const app = express();

app.use(express.json());
app.use(cors());
app.post('/register',async(req, res)=>{
    const user = new User(req.body);
    const result = await user.save(); 
   const newResult =  result.toObject();
    delete newResult.password;
    if(newResult){
        jwt.sign({newResult},jwtKey,{expiresIn: "8h"},(err,token)=>{
            if(err){
                res.send({message:'something went wrong, please try again'});
            }
            res.send({newResult, auth:token})
        })           
    }else{
        res.send({result:'user not found'});
    }
})
app.post('/login',async (req, res)=>{
    console.log(req.body);
    if(req.body.email && req.body.password){
        const user = await User.findOne(req.body).select('-password')
        if(user){
            jwt.sign({user},jwtKey,{expiresIn: "8h"},(err,token)=>{
                if(err){
                    res.send({message:'something went wrong, please try again'});
                }
                res.send({user, auth:token})
            })           
        }else{
            res.send({result:'user not found'});
        }
    }else{
            res.send({result:'user not found'});
    }
});
app.post('/addproducts',verifyToken,async (req, res) =>{
    const product =  new Product(req.body)
    const result = await product.save();
    res.send(result);
})
app.get('/productlist',verifyToken ,async (req, res) =>{
    const products = await Product.find()
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result:'not product found'});
    }
})
app.delete('/deleteproduct/:id',verifyToken,async (req, res) =>{
        const products = await Product.deleteOne({_id:req.params.id})
        res.send(products);
})
app.get('/product/:id',verifyToken,async (req, res) =>{  
    const products = await Product.findOne({_id:req.params.id})
    res.send(products);
})
app.put('/updateproduct/:id',verifyToken,async (req, res) =>{
    const products = await Product.updateOne(
        {_id:req.params.id},
        {$set:req.body}
        )
        res.send(products)
})
app.get('/search/:key',verifyToken, async (req, res) =>{
    const products = await Product.findOne({
        "$or":[
           {name:{$regex:req.params.key}},
           {price:{$regex:req.params.key}},
           {category:{$regex:req.params.key}},
           {company:{$regex:req.params.key}}
        ]
    })
    res.send(products)
})
function verifyToken(req,res,next) {
    let token = req.headers['authorization'];
    if(token){
        token = token.split(' ')[1];
        jwt.verify(token, jwtKey, (err,valid)=>{
            if(err){
                res.status(401).send({result:'Please provide vaild token'});
            }else{
                next();
            }
            })
    }else{
        res.status(403).send({result:'Please add token with header Authorization'});
    }
}
app.listen(5500)


