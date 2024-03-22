const express = require('express');
const { registerUserController, loginUserController } = require('../Controllers/userController');
const router = express.Router()

// register route
router.post('/register',registerUserController)
// login route
router.post('/login',loginUserController)

module.exports = router