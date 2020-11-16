const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const userModel		= require.main.require('./models/userModel');

router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/vuser/adminHome',(req, res)=>{
	userModel.getAllUser((results)=>{
		res.render('vuser/adminHome', {user: req.session.user, allUser: results});
	});
});
router.get('/vuser/customerHome',(req, res)=>{
    res.render('vuser/customerHome', {user: req.session.user});
});
router.get('/addUser',(req, res)=>{
    res.render('vuser/addUser', {user: req.session.user});
});





module.exports = router;