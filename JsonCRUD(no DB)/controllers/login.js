const express 	= require('express');
const fs 		= require('fs');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{
	var data = fs.readFileSync('./controllers/userlist.json' /*, 'utf8'*/);
	var userlist = JSON.parse(data);
	var flag=false;
	userlist.forEach((user) => {
		if(req.body.username==user.username && req.body.password==user.password){
			req.session.uname=user.username;
			req.session.uid=user.id;
			flag=true;
		}
	});
	if(flag){
		res.cookie('userlist', userlist);
		res.redirect('/home');
	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



