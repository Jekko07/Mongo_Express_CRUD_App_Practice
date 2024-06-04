const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


const Product = require('./models/product');

//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method'));

const categories = ['fruit', 'vegetables', 'dairy'];


//route to index.js or homepage
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' }) //category is set to string all
    } 
})

//route to creating a new product
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

//route where the new product submits to
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

//route to Update a product
app.get('/products/:id/edit', async (req, res) => { 
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product, categories}) //after finding the id pass that to product
})



//route to show individual product details
app.get('/products/:id', async (req, res) => {
    //restructure it
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', {product})
})

//updating a specific product
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);

})

//deleting a specific product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products');
})


app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!");
}) //localhost