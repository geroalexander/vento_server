const sectionController = require('./controllers/section-controller');
const userController = require('./controllers/user-controller');
const kitchenController = require('./controllers/kitchen-controller');

const router = require('express').Router();

router.post('/kitchen/:userID', kitchenController.createNewKitchen);
router.put('/inventory/:kitchenID', kitchenController.addItemToInventory);
router.put(
  '/inventory/:kitchenID/:itemID',
  kitchenController.updateInventoryQuantity,
);

// add new user
router.post('/user', userController.createNewUser);
// router.put('/user/:userID', userController.updateUserInfo);
// router.delete('/user/:userID', userController.deleteThisUser);

// create new kitchen and assign to admin user

// add items to inventory of kitchen

// create new section (assign members and restaurant)
router.post('/section/:kitchenID/:userID', sectionController.createNewSection);

// add a new taks to a section
router.put('/task/:sectionID', sectionController.addTaskToSection);

module.exports = router;
