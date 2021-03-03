const mongoose = require('mongoose');
const { reqString, reqNumber } = require('./-shortcuts');

const InventorySchema = new mongoose.Schema(
  {
    //_id is auto created
    itemName: reqString,
    itemQuantity: reqNumber,
  },
  {
    timestamps: true,
  },
);

const KitchenSchema = new mongoose.Schema(
  {
    //_id is auto created
    kitchenName: reqString,
    inventory: [InventorySchema],
    membersID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  },
);

exports.Kitchen = mongoose.model('Kitchen', KitchenSchema);
