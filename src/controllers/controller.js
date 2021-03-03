const { User } = require('../models-mongo/mongo-schemas/user-schema');
const { Section } = require('../models-mongo/mongo-schemas/section-schema');
const { Kitchen } = require('../models-mongo/mongo-schemas/kitchen-schema');

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const dbEmails = await User.find({ email });
    if (dbEmails.length) res.send('this email already has an account');
    else {
      const newUser = await User.create({ name, email, password });

      res.status(201);
      res.send(newUser);
    }
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const createNewKitchen = async (req, res) => {
  try {
    const { name } = req.body;
    const { userID } = req.params;
    const membersID = [userID];
    const newKitchen = await Kitchen.create({ name, membersID });
    res.status(201);
    res.send(newKitchen);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

// const createNewSection = async (req, res) => {
//   try {
//     const { name } = req.body;
//     const newSection = await Section.create(name);
//     res.status(201);
//     res.send(newSection);
//   } catch (err) {
//     res.status(400);
//     res.send(err);
//   }
// };

const addItemToInventory = async (req, res) => {
  try {
    console.log(req.body);
    const inventoryObj = req.body;

    console.log(req.params);
    const { kitchenID } = req.params;
    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenID,
      {
        $push: { inventory: inventoryObj },
      },
      { new: true },
    );
    res.status(201);
    res.send(updatedKitchen);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  createNewUser,
  createNewKitchen,
  // createNewSection,
  addItemToInventory,
};
