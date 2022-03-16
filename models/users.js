const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
  subscriptionStatus: {
    type: Number,
  },
  subscriptions: [
    {
      month: {
        type: Number,
      },
      list: [
        {
          startDate: {
            type: Date,
            required: false,
          },
          endDate: {
            type: Date,
            required: false,
          },
        },
      ],
    },
  ],
  previousBalance: {
    type: Number,
    default: 0,
  },
  payments: [
    {
      paymentDate: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
      },
      paymentMonth: {
        type: Number,
      },
    },
  ],
  leaves: [
    {
      date: {
        type: Date,
      },
      lunch: {
        type: Boolean,
      },
      dinner: {
        type: Boolean,
      },
      appliedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
