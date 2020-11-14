const express 	= require('express');
const userModel		= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.session.uname == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/create', (req, res)=>{
	res.render('user/create');
});


router.post('/create', (req, res)=>{
	var user={
		name: req.body.name,
		companyname: req.body.companyname,
		contactno: req.body.contactno,
		username: req.body.username,
		password: req.body.password,
		role: req.body.role
	}
	userModel.insert(user,(status)=>{
		if(status){
			res.redirect('/home/admin');
		}else{
			res.send('insert failed');
		}
	});
});

router.get('/edit/:id', (req, res)=>{
	var id=req.params.id;
	userModel.getById(id,(results)=>{		
		res.render('user/edit', results[0]);
	});
});

router.post('/edit/:id', (req, res)=>{
	var user={
		id: req.params.id,
		name: req.body.name,
		companyname: req.body.companyname,
		contactno: req.body.contactno,
		username: req.body.username,
		password: req.body.password,
		role: req.body.role
	}
	userModel.update(user,(status)=>{
		if(status){
			res.redirect('/home/admin');
		}else{
			res.send('update failed');
		}
	});
});

router.get('/delete/:id', (req, res)=>{
	var id=req.params.id;
	userModel.getById(id,(results)=>{		
		res.render('user/delete', results[0]);
	});
});

router.post('/delete/:id', (req, res)=>{
	userModel.delete(req.params.id,(status)=>{
		if(status){
			res.redirect('/home/admin');
		}else{
			res.send('delete failed');
		}
	});
});

router.get('/search', (req, res)=>{
	var searchKey= req.query.searchKey;
	userModel.search(searchKey,(results)=>{
		// console.log(results);
		res.json({users: results});
	});
});

module.exports = router;

