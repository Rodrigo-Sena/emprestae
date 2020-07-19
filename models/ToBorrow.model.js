const mongoose = require('mongoose');

const { Schema, model } = mongoose;


const toBorrowSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageUrl: {
        type: String,
      },
    loanCondition: {
      type: String,
      trim: true
    },
    available: {
      type: String,
      trim: true
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