const express = require('express')
const router = express.Router();
const userController = require('./controller/user');
const grantsController = require('./controller/grants');

// exports.renderLogin = (req,res) => {
//     res.render('main',{title:'Grants'});
// }

router.get("/login", userController.renderLogin)
router.post("/login",userController.handleLogin)
router.get("/register",userController.renderRegister)
router.post("/register",userController.handleRegister)
router.get("/logout",userController.logout)
router.get("/dashboard",grantsController.viewDashboard)
router.get("/dashboard-view-details",grantsController.viewDashboardetails)
router.post("/dashboard",grantsController.handleDashboard)
router.get("/enable-tfa",grantsController.enableTfa)
router.post("/verify-tfa",grantsController.verifyTfa)
router.post("/count-total-pages",grantsController.countTotalPages)


module.exports=router;