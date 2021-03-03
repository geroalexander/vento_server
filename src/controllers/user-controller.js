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

// const updateUserInfo = async (req, res) => {
//   try {

//     res.status(200);
//     res.send();
//   } catch (err) {
//     res.status(400);
//     res.send(err);
//   }
// };

module.exports = {
  createNewUser,
  // updateUserInfo,
};

// const deleteThisUser = async (req, res) => {
//   try {
//     () => {};
//   } catch (err) {}
// };
