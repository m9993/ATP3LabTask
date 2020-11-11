const express 		= require('express');
const userModel		= require.main.require('./models/userModel');
const router 		= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status){

			userModel.getUser(user.username,(results)=>{
				if(results[0].role=='admin'){
					req.session.uname= results[0].name;
					res.redirect('/home/admin');
				}
				if(results[0].role=='employee'){
					req.session.uname= results[0].name;
					res.redirect('/home/employee');
				}
				
				
			
			});
				
				

		}else{
			res.redirect('/login');
		}
	});
}); 

module.exports = router;