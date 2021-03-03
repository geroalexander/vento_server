const controller = require('./controllers/controller');
const router = require('express').Router();

// const USER_ID = '603f7db915c259a158259da3';
// const KITCHEN_ID = '603f7e1e03192aa16d472952';
// const SECTION_ID = '603f935c7af053a3ed1f6e80';

// add new user
router.post('/user', controller.createNewUser);

// create new kitchen and assign to admin user
router.post('/kitchen/:userID', controller.createNewKitchen);

// add items to inventory of kitchen
router.put('/inventory/:kitchenID', controller.addItemToInventory);

// create new section (assign members and restaurant)
router.post('/section/:kitchenID/:userID', controller.createNewSection);

// add a new taks to a section
router.put('/task/:sectionID', controller.addTaskToSection);

module.exports = router;
