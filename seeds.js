const mongoose = require('mongoose');
const Product = require('./models/product');


mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!")
        console.log(err)
    })

// const p = new Product({
//     name: 'Watermelon',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Chuckie Milk',
        price: 89,
        category: 'dairy'
    },
    {
        name: 'Kangkong Chips',
        price: 120,
        category: 'vegetables'
    },
    {
        name: 'Lemon Grapes',
        price: 15,
        category: 'fruit'
    },
    {
        name: 'Ponkan Twin',
        price: 50,
        category: 'fruit'
    }
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })