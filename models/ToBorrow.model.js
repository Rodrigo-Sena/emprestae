const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const toBorrowSchema = new Schema(
  {
    category: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
    },
    location: {
      type: String,
    },
    photo: {
        type: String,
      },
    loanCondition: {
      type: String,
    },
    available: {
      type: String,
    }

  },
  {
    timestamps: true
  }


);

module.exports = model('ToBorrow', toBorrowSchema);