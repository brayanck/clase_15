const express = require("express");
const { Router } = express;
const router = new Router();
const Product = require("../daos/models/products.model");
const Email = require("../daos/models/users.model");
const Cart = require("../daos/models/carts.model");
let id_email
module.exports = function (io) {
    router.get("/", (req, res) => {
        res.render("cart", {});
    });
    io.on("connection", async (socket) => {
        console.log("new email connected");

        socket.on('client:send-emailname', async (emailname) => {
            const email = await Email.findOne({ email: emailname });
            id_email = email._id
            emitProduct2()
        });
        const emitProduct2 = async () => {
            const cart = await Cart.findOne({ user: id_email });
            console.log(cart);
            if (cart) {
            socket.emit("server:load-cart", cart.carts);
            } else {
            console.log('No se encontró el carrito');
            }
        };
        emitProduct2();
        socket.on("cliente:send-product", async (data) => {
            try {
                let { name, count, usuario } = data;
                const product = await Product.findOne({ name });
                let email = await Email.findOne({ email: usuario });
                let emailId = email._id; // Se obtiene el _id del usuario
                const cart = await Cart.findOne({ user: emailId });
                if (product) {
                    if (cart && cart.carts.some(item => item.id.toString() === product._id.toString())) {
                        // Si el producto ya existe en el carrito, se aumenta la cantidad
                        const updatedCart = await Cart.findOneAndUpdate(
                            { user: emailId, "carts.id": product._id }, // Filtro para encontrar el carrito del usuario y el producto específico
                            { $inc: { "carts.$.count": count } }, // Incrementa la cantidad del producto existente
                            { new: true }
                        );
                        if (updatedCart) {
                            console.log('Updated Cart:', updatedCart);
                            emitProduct2();
                        } else {
                            console.log('Cart not found');
                        }
                    } else {
                        // Si el producto no existe en el carrito, se agrega como un nuevo elemento
                        const cart = await Cart.findOneAndUpdate(
                            { user: emailId },
                            {
                                $push: {
                                    carts: { id: product._id, name: name, count: count },
                                },
                            },
                            { new: true }
                        );
                        if (cart) {
                            console.log('Updated Cart:', cart);
                            emitProduct2();
                        } else {
                            console.log('Cart not found');
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        });
        socket.on("client:deleteProduct",async(id)=>{
            try{
                const cart = await Cart.findOne({ user: id_email });
                if (cart){
                    const updatedCart = await Cart.findOneAndUpdate(
                        { user: id_email },
                        { $pull: { carts: { _id: id } } },
                        { new: true }
                      );
                }
                emitProduct2()
            }catch(err){
                console.log(err)
            }
            
        })

        socket.on('disconnect', (data) => {
            console.log("email disconet")
            id_email = undefined;
        })
    });
    return router;
};
