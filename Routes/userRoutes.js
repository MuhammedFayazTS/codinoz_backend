const express = require('express');
const { registerUserController, loginUserController, verifyTokenController } = require('../Controllers/userController');
const router = express.Router()
const authMiddlewre = require('../middleware/authMiddleware');
// register route
router.post('/register',registerUserController)
// login route
router.post('/login',loginUserController)
// verify token route
router.get('/:id/verify/:token',verifyTokenController)
// validateTokn
router.get('/verify/token',authMiddlewre,async(req,res)=>{
    res.status(200).json({message:"Token validation successful"})
})

module.exports = router