const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  }
});

emailSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const Cart = mongoose.model('Cart');
      const cart = new Cart({ user: this._id });
      await cart.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Email = mongoose.model('User', emailSchema);
module.exports = Email;