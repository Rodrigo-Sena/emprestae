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
    photo: {
        type: String,
      },
    loanCondition: {
      type: String,
    },
    available: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  {
    timestamps: true
  }


);

module.exports = model('ToBorrow', toBorrowSchema);