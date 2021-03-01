const mongoose = require('mongoose');
const { reqString, reqNumber } = require('./-shortcuts');

const TaskSchema = new mongoose.Schema(
  {
    //_id
    taskName: reqString,
    maxQuantity: reqNumber,
    curQuantity: reqNumber,
    completed: Boolean,
  },
  {
    timestamps: true,
  },
);

const SectionSchema = new mongoose.Schema(
  {
    //_id
    name: reqString,
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    memebersID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks: [TaskSchema],
  },
  {
    timestamps: true,
  },
);

exports.Section = mongoose.model('Section', SectionSchema);
