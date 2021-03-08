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

const findSectionByID = async (req, res) => {
  try {
    const { sectionID } = req.params;
    const searchedSection = await Section.findById(sectionID);
    res.status(201);
    res.send(searchedSection);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const addTaskToSection = async (req, res) => {
  try {
    const { taskName, maxQuantity } = req.body;
    const { sectionID } = req.params;
    const checkForTask = await Section.findOne({
      'tasks.taskName': taskName,
      'tasks.maxQuantity': maxQuantity,
      sectionID: sectionID,
    });
    console.log('checked for task', checkForTask);
    if (checkForTask) {
      res.send(`You already have a task called ${taskObject.taskName}`);
    } else {
      const createdTask = await Section.findByIdAndUpdate(
        sectionID,
        { $push: { tasks: { taskName, maxQuantity } } },
        { new: true },
      );
      res.status(200);
      res.send(createdTask.tasks);
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
    const updatedTaskList = await Section.findOneAndUpdate(
      {},
      { $pull: { tasks: { _id: taskID } } },
      { new: true },
    );
    res.status(200);
    res.send(updatedTaskList);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

// const deleteSection = async (req, res) => {
//   try {
//     const { kitchenID} = req.params;
//     const updatedKitchen = await Section.findByIdAndUpdate(
//       {}
//     )
//   } catch (err) {
//     res.status(400);
//     res.send(err);
//   }
// }

const updateNotes = async (req, res) => {
  try {
    const { sectionID } = req.params;
    const { notes } = req.body;
    const updatedSection = await Section.findByIdAndUpdate(
      sectionID,
      {
        notes,
      },
      { new: true },
    );
    res.status(200);
    res.send(updatedSection);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

module.exports = {
  createNewSection,
  findSectionByID,
  addTaskToSection,
  updateTaskInSection,
  removeTaskItem,
  updateNotes,
  // deleteSection,
};
