const mongoose = require('mongoose');
const { reqString, refID, falseBool } = require('./-shortcuts');

const UserSchema = new mongoose.Schema(
  {
    //_id is auto created
    name: reqString,
    email: reqString,
    password: reqString,
    kitchenID: refID,
    sectionID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    admin: falseBool,
  },
  {
    timestamps: true,
  },
);

exports.User = mongoose.model('User', UserSchema);
