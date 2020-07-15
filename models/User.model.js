const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {

    userName: {
      type: String,
      required: [true, 'Username is required.'],
      trim: true
    },
    email: {
      type: String,
      required: [true,'e-mail is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      // unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
    },
    neighbourhood: {
      type: String,
      required: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
      }
    

  },
  {
    timestamps: true
  }

  
);

module.exports = model('User', userSchema);