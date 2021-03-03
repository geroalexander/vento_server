const controller = require('./controllers/controller');
const router = require('express').Router();

// post to create a new admin

// const USER_ID = '603ebee2e195d592c261d886';
// const KITCHEN_ID = '603ecabac3607193f5fd1b81';

// method to add new user
router.post('/user', controller.createNewUser);

// method to create new kitchen and assign to admin user
router.post('/kitchen/:userID', controller.createNewKitchen);

// method to add items to inventory of kitchen (id)
router.put('/inventory/:kitchenID', controller.addItemToInventory);

//
// router.post('/section', controller.createNewSection);

module.exports = router;
