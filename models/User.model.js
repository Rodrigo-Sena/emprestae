const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {

    userName: {
      type: String,
      require: [true, 'Username is required.'],
      trim: true,
      unique: true
    },
    email: {
      type: String,
      require: [true,'e-mail is required'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true
    },
    password: {
        type: String,
        require: [true,'Password is required'],
        unique: true
      }
    

  },
  {
    timestamps: true
  }

  
);

module.exports = model('User', userSchema);