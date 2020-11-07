const express 	= require('express');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['userlist'] == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	
	var info=[];
	info[0]= req.cookies['userlist'].length+1;
	info[1]=req.body.username;
	info[3]=req.body.password;
	info[2]=req.body.email;

	var update= req.cookies['userlist'];
	update.push(info);

	res.cookie('userlist', update);
	res.redirect('/home/userlist');
});

router.get('/edit/:id', (req, res)=>{
	var id=req.params.id;
	var info=req.cookies['userlist'][id-1];
	var user = {
		username: info[1],
		password: info[3],
		email: info[2]
	};
	res.render('user/edit', user);
});

router.post('/edit/:id', (req, res)=>{
	var id=req.params.id;
	var info=req.cookies['userlist'][id-1];
	info[1]=req.body.username;
	info[3]=req.body.password;
	info[2]=req.body.email;
	req.cookies['userlist'][id-1]=info;
	var update= req.cookies['userlist'];

	res.cookie('userlist', update);
	res.redirect('/home/userlist');
});

router.get('/delete/:id', (req, res)=>{
	var id=req.params.id;
	var info=req.cookies['userlist'][id-1];
	var user = {
		username: info[1],
		password: info[3],
		email: info[2]
	};
	res.render('user/delete', user);
});

router.post('/delete/:id', (req, res)=>{
	var id=req.params.id;
	var info=req.cookies['userlist'][id-1];
	info[1]=null;
	info[2]=null;
	info[3]=null;
	req.cookies['userlist'][id-1]=info;
	var update= req.cookies['userlist'];

	res.cookie('userlist', update);

	res.redirect('/home/userlist');
});

module.exports = router;

