const { User } = require('../models-mongo/mongo-schemas/user-schema');
const { Section } = require('../models-mongo/mongo-schemas/section-schema');
const { Kitchen } = require('../models-mongo/mongo-schemas/kitchen-schema');

const createNewKitchen = async (req, res) => {
  try {
    const { kitchenName } = req.body;
    const { userID } = req.params;
    const membersID = [userID];

    const newKitchen = await Kitchen.create({ kitchenName, membersID });
    const updatedAdmin = await User.findByIdAndUpdate(
      userID,
      { $set: { admin: true, kitchenID: newKitchen._id } },
      { new: true },
    );
    res.status(201);
    res.send({
      newKitchen,
      updatedAdmin,
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addItemToInventory = async (req, res) => {
  try {
    const { itemName, itemQuantity } = req.body;
    const { kitchenID } = req.params;

    const checkForItem = await Kitchen.findOne({
      'inventory.itemName': itemName,
    });
    if (checkForItem) {
      res.send(`You already have an item called ${itemName}!`);
    } else {
      const createdInventory = await Kitchen.findByIdAndUpdate(
        kitchenID,
        { $push: { inventory: { itemName, itemQuantity } } },
        { new: true },
      );
      res.status(201);
      res.send(createdInventory);
    }
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const updateInventoryQuantity = async (req, res) => {
  try {
    const { itemQuantity } = req.body;
    const { itemID, kitchenID } = req.params;

    const updatedItem = await Kitchen.findOneAndUpdate(
      { 'inventory._id': itemID },
      { $set: { 'inventory.$.itemQuantity': itemQuantity } },
      { new: true },
    );
    res.status(201);
    res.send(updatedItem);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  createNewKitchen,
  addItemToInventory,
  updateInventoryQuantity,
};
