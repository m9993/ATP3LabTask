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

router.get('/admin',(req, res)=>{
    res.render('admin/home', {user: req.session.user});
});
router.get('/customer',(req, res)=>{
    res.render('customer/home', {user: req.session.user});
});





module.exports = router;