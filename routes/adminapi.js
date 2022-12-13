const express = require('express');

const routes  = express.Router();

const passport = require('passport');

const apicontroller = require('../controllers/apicontroller');

routes.post('/admindata',apicontroller.admindata);

routes.get('/viewadmin',passport.authenticate('jwt',{session:false}),apicontroller.viewadmin);

routes.delete('/deleteadmin',passport.authenticate('jwt',{session:false}),apicontroller.deleteadmin);

routes.patch('/updateadmin',passport.authenticate('jwt',{session:false}),apicontroller.updateadmin);

routes.get('/orderData',passport.authenticate('jwt',{session:false}),apicontroller.orderData);

routes.post('/addcategory',passport.authenticate('jwt',{session:false}),apicontroller.addcategory);

routes.post('/subcategory',passport.authenticate('jwt',{session:false}),apicontroller.subcategory);

routes.get('/viewsubcategory',passport.authenticate('jwt',{session:false}),apicontroller.viewsubcategory);

routes.post('/logindata',apicontroller.logindata);

module.exports = routes;