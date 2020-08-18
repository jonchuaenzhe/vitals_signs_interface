const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ecgDataSchema = new Schema({
  sample_no: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  ecg_data: { type: [[Number]], required: true },
});

module.exports = mongoose.model("EcgData", ecgDataSchema);
