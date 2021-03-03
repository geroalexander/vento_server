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

    const currentKitchen = await Kitchen.findById(kitchenID);
    let checkKitchen = await currentKitchen.inventory.find(
      (inventory) => inventory.itemName === itemName,
    );
    if (checkKitchen) {
      res.send('You already have a product with that name!');
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

module.exports = {
  createNewKitchen,
  addItemToInventory,
};
