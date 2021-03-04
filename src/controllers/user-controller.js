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

module.exports = {
  createNewUser,
  findUserByID,
};
