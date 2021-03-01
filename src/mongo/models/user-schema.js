const mongoose = require('mongoose');
const { reqString } = require('./-shortcuts');

const UserSchema = new mongoose.Schema(
  {
    //_id
    name: reqString,
    restaurantID: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
    sectionID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],
    email: reqString,
    admin: { type: Boolean },
  },
  {
    timestamps: true,
  },
);

exports.User = mongoose.model('User', UserSchema);
