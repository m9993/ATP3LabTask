const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const jobModel = require.main.require('./models/jobModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.uname == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/admin', (req, res)=>{

	userModel.getAll(function(results){
		res.render('home/admin', {users: results});
	});

})
router.get('/employee', (req, res)=>{

	jobModel.getAll(function(results){
		res.render('home/employee', {job: results});
	});

})

module.exports = router;