const sectionCTRL = require('./controllers/section-controller');
const userCTRL = require('./controllers/user-controller');
const kitchenCTRL = require('./controllers/kitchen-controller');

const router = require('express').Router();

router.post('/kitchen/:userID', kitchenCTRL.createNewKitchen);
router.put('/inventory/:kitchenID', kitchenCTRL.addItemToInventory);
router.put(
  '/inventory/:kitchenID/:itemID',
  kitchenCTRL.updateInventoryQuantity,
);

// add new user
router.post('/user', userCTRL.createNewUser);
// router.put('/user/:userID', userCTRL.updateUserInfo);
// router.delete('/user/:userID', userCTRL.deleteThisUser);

// create new kitchen and assign to admin user

// add items to inventory of kitchen

// create new section (assign members and restaurant)
router.post('/section/:kitchenID/:userID', sectionCTRL.createNewSection);

// add a new taks to a section
router.put('/task/:sectionID', sectionCTRL.addTaskToSection);

module.exports = router;
