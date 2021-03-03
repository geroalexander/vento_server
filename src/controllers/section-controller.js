const { User } = require('../models-mongo/mongo-schemas/user-schema');
const { Section } = require('../models-mongo/mongo-schemas/section-schema');
const { Kitchen } = require('../models-mongo/mongo-schemas/kitchen-schema');

const createNewSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { kitchenID, userID } = req.params;

    const checkForSection = await Section.findOne({
      sectionName: sectionName,
    });

    if (checkForSection) {
      res.send(`You already have a section called ${sectionName}!`);
    } else {
      const newSection = await Section.create({
        sectionName,
        kitchenID,
      });
      const updatedAdmin = await User.findByIdAndUpdate(
        userID,
        { $push: { sectionID: newSection._id } },
        { new: true },
      );
      res.status(201);
      res.send({
        newSection,
        updatedAdmin,
      });
    }
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
  createNewSection,
  addTaskToSection,
};
