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

router.post('/section/:kitchenID/:userID', sectionCTRL.createNewSection);
router.put('/task/:sectionID', sectionCTRL.addTaskToSection);
router.put('/task/:sectionID/taskID', sectionCTRL.updateTaskInSection);

router.post('/user', userCTRL.createNewUser);

// add a new taks to a section

module.exports = router;
