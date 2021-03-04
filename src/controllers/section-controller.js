const { User } = require('../models-mongo/mongo-schemas/user-schema');
const { Section } = require('../models-mongo/mongo-schemas/section-schema');
const { Kitchen } = require('../models-mongo/mongo-schemas/kitchen-schema');

const createNewSection = async (req, res) => {
  try {
    const { sectionName } = req.body;
    const { kitchenID, userID } = req.params;

    const checkForSection = await Section.findOne({
      sectionName: sectionName,
      kitchenID: kitchenID,
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

    const checkForTask = await Section.findOne({
      'tasks.taskName': taskObject.taskName,
      sectionID: sectionID,
    });

    if (checkForTask) {
      res.send(`You already have a task called ${taskObject.taskName}`);
    } else {
      if (taskObject.maxQuantity === taskObject.curQuantity)
        taskObject.completed = true;
      const createdTask = await Section.findByIdAndUpdate(
        sectionID,
        { $push: { tasks: taskObject } },
        { new: true },
      );
      res.status(200);
      res.send(createdTask);
    }
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const updateTaskInSection = async (req, res) => {
  try {
    const { curQuantity, completed } = req.body;
    const { taskID } = req.params;

    const updatedTask = await Section.findOneAndUpdate(
      { 'tasks._id': taskID },
      {
        $set: {
          'tasks.$.curQuantity': curQuantity,
          'tasks.$.completed': completed,
        },
      },
      { new: true },
    );
    res.status(200);
    res.send(updatedTask);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const removeTaskItem = async (req, res) => {
  try {
    const { sectionID, taskID } = req.params;
    console.log(sectionID, taskID);
    const updatedTaskList = await Section.findOneAndUpdate(
      {},
      { $pull: { tasks: { _id: taskID } } },
      { new: true },
    );
    console.log('updated', updatedTaskList);
    res.status(200);
    res.send(updatedTaskList);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  createNewSection,
  addTaskToSection,
  updateTaskInSection,
  removeTaskItem,
};
