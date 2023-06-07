const express = require('express')
const { Router } = express
const router = new Router()
const Message = require('../daos/models/messages.model')
const Email = require('../daos/models/users.model')


module.exports = function (io) {
    router.get('/', (req, res) => {
        res.render("chat", {})
    });
    io.on("connection", async (socket) => {
        console.log("new email connected");
        const emitMessage = async () => {
            const messages =await Message.find({});
            const projectMessages = messages.map((msg) => {
                return {
                    email: msg.email,
                    message: msg.message
                };
            });
            io.emit("load-old-messages", projectMessages);
        }
        emitMessage()

        socket.on("send-message", async (data) => {
            let { email } = data
            let valiemail = await Email.findOne({ email })
            let objeto = {
                email: data.email,
                message: data.message
            }
            let newMsg = new Message(objeto)
            await newMsg.save();
            io.sockets.emit("new-message", {
                message: data.message,
                email: data.email
            });
        });

        socket.on('disconnect', (data) => {
            console.log("email disconet")
        })

    });

    return router
};
