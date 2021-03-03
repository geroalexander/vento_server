const mongoose = require('mongoose');
const { reqString, reqNumber, falseBool } = require('./-shortcuts');

const TaskSchema = new mongoose.Schema(
  {
    //_id is auto created
    taskName: reqString,
    maxQuantity: reqNumber,
    curQuantity: reqNumber,
    units: String,
    completed: falseBool,
  },
  {
    timestamps: true,
  },
);

const SectionSchema = new mongoose.Schema(
  {
    //_id is auto created
    sectionName: reqString,
    kitchenID: { type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' },
    // membersID: [{ type: mongoose .Schema.Types.ObjectId, ref: 'User' }],
    tasks: [TaskSchema],
  },
  {
    timestamps: true,
  },
);

exports.Section = mongoose.model('Section', SectionSchema);
