const express = require('express')
const router = express.Router();
const userController = require('./controller/user');
const grantsController = require('./controller/grants');
const getUserNameController = require('./controller/getUserName.controller');
const myGrantsController = require('./controller/myDataDashboard.controller');
const getInterestsController = require('./controller/getInterests.controller')

// exports.renderLogin = (req,res) => {
//     res.render('main',{title:'Grants'});
// }

router.get("/login", userController.renderLogin)
router.post("/login",userController.handleLogin)
router.get("/register",userController.renderRegister)
router.post("/register",userController.handleRegister)
router.get("/logout",userController.logout)
router.get("/dashboard_view",grantsController.viewDashboard)
router.get("/dashboard-view-details",grantsController.viewDashboardetails)
router.post("/dashboard_view",grantsController.handleDashboard)
router.get("/enable-tfa",grantsController.enableTfa)
router.post("/verify-tfa",grantsController.verifyTfa)
router.post("/count-total-pages",grantsController.countTotalPages)
router.get('/data_dashboard', grantsController.getDataDashboard);


router.get("/getUserInfo", getUserNameController.fetchUserData);
router.get("/getInterests",getInterestsController.fetchInterests);
// router.get("/analytics", analyticsController.showAnalyticsPage);
// router.get("/analytics-data", analyticsController.getData);
router.get('/my_data_dashboard', myGrantsController.getMyDataDashboard);
router.get('/my_dashboard_view', myGrantsController.myDashboardData);
// router.post('/my_dashboard_view', myGrantsController.myDashboard_Data);

router.get("/fetch_chart_data",getUserNameController.fetchChartData)



module.exports=router;