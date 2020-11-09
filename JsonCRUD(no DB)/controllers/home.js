const express 	= require('express');
const router 	= express.Router();
const fs 		= require('fs');

router.get('*',  (req, res, next)=>{
	if(req.cookies['userlist'] == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('home/index', {name: req.session.uname, id: req.session.uid});	
});


router.get('/userlist', (req, res)=>{
	var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
	var userlist=JSON.parse(data);
	var list = [];

	userlist.forEach(function(user){
		list.push([user.id,user.username,user.email,user.password]);
	});
	res.render('home/userlist', {users: list});		
})

module.exports = router;