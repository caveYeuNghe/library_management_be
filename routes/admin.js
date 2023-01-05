const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');
const auth = require("../middleware/auth")

adminRouter.get('/login', adminController.login);
adminRouter.post('/logout', auth, adminController.logout);
adminRouter.post('/signup', adminController.signup);

module.exports = adminRouter;