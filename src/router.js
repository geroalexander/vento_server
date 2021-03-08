const sectionCTRL = require('./controllers/section-controller');
const userCTRL = require('./controllers/user-controller');
const kitchenCTRL = require('./controllers/kitchen-controller');

const router = require('express').Router();

//~~~~~~~~~KITCHEN REQUESTS~~~~~~~~~~~
router.post('/kitchen/:userID', kitchenCTRL.createNewKitchen);
router.get('/kitchen/:kitchenID', kitchenCTRL.findKitchenByID);
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
router.get('/section/:sectionID', sectionCTRL.findSectionByID);
router.post('/section/:kitchenID/:userID', sectionCTRL.createNewSection);
// router.delete('/section/:kitchenID', sectionCTRL.deleteSection)
router.put('/section/:sectionID/notes', sectionCTRL.updateNotes);
router.put('/task/:sectionID', sectionCTRL.addTaskToSection);
router.put('/task/:sectionID/:taskID', sectionCTRL.updateTaskInSection);
router.delete('/task/:sectionID/:taskID', sectionCTRL.removeTaskItem);

//~~~~~~~~~USER REQUESTS~~~~~~~~~~~

router.get('/user/:userID', userCTRL.findUserByID);
router.post('/user', userCTRL.createNewUser);
router.post('/user/kitchen', userCTRL.createNewUserInKitchen);
// router.get('/user/:kitchenID', userCTRL.getUserInKitchen);

module.exports = router;
