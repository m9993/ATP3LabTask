const express       = require('express');
const session = require('express-session');
const {body, validationResult} 		= require('express-validator');
const router       = express.Router();
const orderModel		= require.main.require('./models/orderModel');

router.get('*',  (req, res, next)=>{
	if(req.session.user == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});
router.post('/addOrder',  (req, res)=>{
	var order={
		uid: req.session.user.uid.toString(),
		opaymentmethod: req.body.opaymentmethod,
		ostatus: 'pending',
		oamount: req.body.oamount,
		oaddress: req.body.oaddress,
	};
	orderModel.insert(order,(status)=>{
		if(status){
			req.session.cart=undefined;
			res.redirect('/medicine/vuser/customerHome');
		}else{
			res.send('Order Failed.');
		}
	});
});



module.exports = router;