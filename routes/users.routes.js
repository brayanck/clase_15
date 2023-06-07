const Email = require("../daos/models/users.model");
const Cart = require("../daos/models/carts.model");

const router = require("express").Router();


router.get('/register', (req, res) => {
    res.render("register", {});
  });
  
  router.get('/login', (req, res) => {
    res.render("login", {});
  });
  
  router.post("/register", async (req, res) => {
    try {
      const { email } = req.body;
      const emailCheck = await Email.findOne({ email });
      if (emailCheck) {
        return res.json({ msg: "Email está en uso", status: false });
      }
  
      const valiemail = new Email({ email });
      const savedEmail = await valiemail.save();
  
      // Verificar si el usuario ya tiene un carrito
      const existingCart = await Cart.findOne({ user: savedEmail._id });
      if (existingCart) {
        return res.json({ msg: "El usuario ya tiene un carrito", status: false });
      }
  
      // Crear el carrito relacionado al usuario
      const newCart = new Cart({ user: savedEmail._id });
      await newCart.save();
  
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  
  router.post("/login", async (req, res) => {
    try {
      const { email } = req.body;
      const valiemail = await Email.findOne({ email });
      if (!valiemail) {
        return res.json({ msg: "Usuario no existe", status: false });
      }
  
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });
  
  module.exports = router;