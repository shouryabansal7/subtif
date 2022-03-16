const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HolidaySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Holiday = mongoose.model("Holiday", HolidaySchema);
module.exports = Holiday;
