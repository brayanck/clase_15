const express = require('express')
const { Router } = express
const router = new Router()
const Product = require('../daos/models/products.model') 

module.exports = (io) => {
    router.get('/',(req, res) => {
        res.render("Products", {})
    });
    io.on('connection', (socket)=>{
        const emitProduct = async()=>{
            const products = await Product.find({})
            io.emit("server:load-Products",products)
        }
        emitProduct()


        socket.on("cliente:new-product",async(data)=>{
            let product = new Product(data)
            const savedProduct = await product.save()
            io.emit('servidor:newProduct',savedProduct)
        })

        socket.on("client:deleteProduct",async(id)=>{
            await Product.findByIdAndDelete(id)
            emitProduct()
        })
        socket.on("client:getProduct",async(id)=>{
            const product = await Product.findById(id)
            io.emit("server:slectedProduct",product)
        })

        socket.on("client:updateProduct",async(data)=>{
            await Product.findByIdAndUpdate(data._id,data,)
            emitProduct()
        })
    
})
    return router
}