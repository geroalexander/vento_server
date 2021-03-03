const sectionController = require('./controllers/section-controller');
const userController = require('./controllers/user-controller');
const kitchenController = require('./controllers/kitchen-controller');

const router = require('express').Router();

// add new user
router.post('/user', userController.createNewUser);
// router.put('/user/:userID', userController.updateUserInfo);
// router.delete('/user/:userID', userController.deleteThisUser);

// create new kitchen and assign to admin user
router.post('/kitchen/:userID', kitchenController.createNewKitchen);

// add items to inventory of kitchen
router.put('/inventory/:kitchenID', kitchenController.addItemToInventory);

// create new section (assign members and restaurant)
router.post('/section/:kitchenID/:userID', sectionController.createNewSection);

// add a new taks to a section
router.put('/task/:sectionID', sectionController.addTaskToSection);

module.exports = router;
