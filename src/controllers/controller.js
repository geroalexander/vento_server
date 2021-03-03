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

const createNewSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { kitchenID, userID } = req.params;

    const newSection = await Section.create({
      sectionName,
      kitchenID,
    });
    const updatedAdmin = await User.findByIdAndUpdate(
      userID,
      // push the new section into the user object sectionID array
      { $push: { sectionID: newSection._id } },
      { new: true },
    );
    res.status(201);
    res.send({
      newSection,
      updatedAdmin,
    });
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addItemToInventory = async (req, res) => {
  try {
    const inventoryObject = req.body;
    const { kitchenID } = req.params;

    const createdInventory = await Kitchen.findByIdAndUpdate(
      kitchenID,
      { $push: { inventory: inventoryObject } },
      { new: true },
    );
    res.status(201);
    res.send(createdInventory);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addTaskToSection = async (req, res) => {
  try {
    const taskObject = req.body;
    const { sectionID } = req.params;

    const createdTask = await Section.findByIdAndUpdate(
      sectionID,
      { $push: { tasks: taskObject } },
      { new: true },
    );
    res.status(201);
    res.send(createdTask);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  createNewUser,
  createNewKitchen,
  createNewSection,
  addItemToInventory,
  addTaskToSection,
};
