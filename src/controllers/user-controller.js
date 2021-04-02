const { User } = require('../models-mongo/mongo-schemas/user-schema');
const { Section } = require('../models-mongo/mongo-schemas/section-schema');
const { Kitchen } = require('../models-mongo/mongo-schemas/kitchen-schema');

const createNewAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = await User.create({ name, email, password });
    res.status(201);
    res.send(newUser);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const createNewEmployee = async (req, res) => {
  try {
    const { name, email, password, kitchenID } = req.body;
    console.log('name----->', name);
    console.log('email----->', email);
    console.log('password----->', password);
    console.log('kitchenID----->', kitchenID);

    const newUser = await User.create({ name, email, password });

    const updatedKitchen = await Kitchen.findByIdAndUpdate(
      kitchenID,
      { $push: { membersID: 'newUser._id' } },
      { new: true },
    );

    console.log('---newUser---->', newUser);
    console.log('---updatedKitchen---->', updatedKitchen);

    // res.status(201);
    // res.send(newUser);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

const findUserByID = async (req, res) => {
  try {
    const { userID } = req.params;
    const searchedUser = await User.findById(userID);
    res.status(201);
    res.send(searchedUser);
  } catch (err) {
    res.status(400);
    res.send(err);
  }
};

// const getUserInKitchen = async( req, res) => {
//   try {
//     const { kitchenID} = req.qarams;
//     const
//   } catch (err) {
//     res.status(400)
//     res.send(err)
//   }
// }

module.exports = {
  createNewAdmin,
  findUserByID,
  createNewEmployee,
};
