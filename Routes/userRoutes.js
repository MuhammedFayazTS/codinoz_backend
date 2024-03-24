const express = require('express');
const { registerUserController, loginUserController, verifyTokenController } = require('../Controllers/userController');
const router = express.Router()

// register route
router.post('/register',registerUserController)
// login route
router.post('/login',loginUserController)
// verify token route
router.get('/:id/verify/:token',verifyTokenController)

module.exports = router