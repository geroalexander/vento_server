const mongoose = require('mongoose');
const { reqString } = require('./-shortcuts');

const InventorySchema = new mongoose.Schema(
  {
    //_id is auto created
    itemName: reqString,
    itemQuantity: Number,
  },
  {
    timestaps: true,
  },
);

const RestaurantSchema = new mongoose.Schema(
  {
    //_id is auto created
    name: reqString,
    inventory: [InventorySchema],
    membersID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

exports.Restaurant = mongoose.model('Restaurant', RestaurantSchema);
