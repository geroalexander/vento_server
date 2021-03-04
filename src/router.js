const sectionCTRL = require('./controllers/section-controller');
const userCTRL = require('./controllers/user-controller');
const kitchenCTRL = require('./controllers/kitchen-controller');

const router = require('express').Router();

//~~~~~~~~~KITCHEN REQUESTS~~~~~~~~~~~
router.post('/kitchen/:userID', kitchenCTRL.createNewKitchen);
router.post('/inventory/:kitchenID', kitchenCTRL.addItemToInventory);
router.put(
  '/inventory/:kitchenID/:itemID',
  kitchenCTRL.updateInventoryQuantity,
);
router.delete(
  '/inventory/:kitchenID/:itemID',
  kitchenCTRL.removeItemFromInventory,
);

//~~~~~~~~~SECTION REQUESTS~~~~~~~~~~~
router.post('/section/:kitchenID/:userID', sectionCTRL.createNewSection);
router.post('/task/:sectionID', sectionCTRL.addTaskToSection);
router.put('/task/:sectionID/:taskID', sectionCTRL.updateTaskInSection);

//~~~~~~~~~USER REQUESTS~~~~~~~~~~~

router.get('/user/:userID', userCTRL.findUserByID);
router.post('/user', userCTRL.createNewUser);

module.exports = router;
