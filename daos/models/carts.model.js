const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

const CartsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  carts: {
    type: [CartItemSchema],
    validate: {
      validator: function (carts) {
        return carts.length > 0 || this.carts.length === 0;
      },
      message: 'El campo "carts" debe contener al menos un elemento o puede estar vacío.'
    }
  }
}, { strictPopulate: false });

CartsSchema.pre('find', function (next) {
  this.populate('user');
  next();
});

const Cart = mongoose.model('Cart', CartsSchema);
module.exports = Cart;