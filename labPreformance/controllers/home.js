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
		console.log(req.session.uname);
	res.render('home/admin', {users: results, profileName: req.session.uname});
	});

})
router.get('/employee', (req, res)=>{

	jobModel.getAll(function(results){
		res.render('home/employee', {job: results, profileName: req.session.uname});
	});

})

module.exports = router;