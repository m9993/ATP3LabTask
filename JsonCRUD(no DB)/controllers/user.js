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

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	var data = fs.readFileSync('./controllers/userlist.json' /*, 'utf8'*/);
	var userlist = JSON.parse(data);
	var info=[];
	var id= userlist.length+1;
	info[0]= id.toString();
	info[1]=req.body.username;
	info[3]=req.body.password;
	info[2]=req.body.email;

	var newList=[];
	userlist.forEach((user) => {
		newList.push([user.id,user.username,user.email,user.password]);
	});
	newList.push(info);

	var userobj=[];
	newList.forEach((user) => {
		userobj.push({
			id : user[0],
			username : user[1],
			email : user[2],
			password : user[3]
		});		
	});

	fs.writeFileSync('userlist.json', JSON.stringify(userobj,null,4));
	res.cookie('userlist', userobj);
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
	var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});
		userlist.forEach(function(user,index){
			if(req.params.id == user[0]){
				userlist[index][1] = req.body.username;
				userlist[index][2] = req.body.email;
				userlist[index][3] = req.body.password;
			}
		});
		var userobj = [];
		userlist.forEach(function(user){
			userobj.push({
				id : user[0],
				username : user[1],
				email : user[2],
				password : user[3]
			});

		});
		fs.writeFile("./controllers/userlist.json", JSON.stringify(userobj, null, 4));

	res.cookie('userlist', userobj);
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
	var data=fs.readFileSync('./controllers/userlist.json', 'utf8');
		var list=JSON.parse(data);
		var userlist = [];
		list.forEach(function(user){
			userlist.push([user.id,user.username,user.email,user.password]);
		});
		var userobj = [];
		userlist.forEach(function(user){
			if(req.params.id != user[0]){
				userobj.push({
					id : user[0],
					username : user[1],
					email : user[2],
					password : user[3]
				});
			}
		});
		fs.writeFile("./controllers/userlist.json", JSON.stringify(userobj, null, 4));

	res.cookie('userlist', userobj);

	res.redirect('/home/userlist');
});

module.exports = router;

