const mongoose = require('mongoose');
const { reqString, otherID, falseBool } = require('./-shortcuts');

const UserSchema = new mongoose.Schema(
  {
    //_id is auto created
    name: reqString,
    restaurantID: otherID,
    sectionID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    email: reqString,
    admin: falseBool,
  },
  {
    timestamps: true,
  },
);

exports.User = mongoose.model('User', UserSchema);
