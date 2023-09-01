const express = require('express');
const cors = require('cors');
require('./config');
const User = require('./user');
const Product = require('./product');
const app = express();
app.use(express.json());
app.use(cors());
app.post('/register',async(req, res)=>{
    const user = new User(req.body);
    const result = await user.save();
   const newResult =  result.toObject();
    delete newResult.password;
    res.send(newResult);
})
app.post('/login',async (req, res)=>{
    console.log(req.body);
    if(req.body.email && req.body.password){
        const user = await User.findOne(req.body).select('-password')
        if(user){
            res.send(user);
        }else{
            res.send({result:'user not found'});
        }
    }else{
            res.send({result:'user not found'});
    }
});
app.post('/addproducts',async (req, res) =>{
    const product =  new Product(req.body)
    const result = await product.save();
    res.send(result);
})
app.get('/productlist',async (req, res) =>{
    const products = await Product.find()
    if(products.length > 0){
        res.send(products);
    }else{
        res.send({result:'not product found'});
    }
})
app.delete('/deleteproduct/:id',async (req, res) =>{
        const products = await Product.deleteOne({_id:req.params.id})
        res.send(products);
})

app.listen(5500)


