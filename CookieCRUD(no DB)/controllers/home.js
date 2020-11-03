const express 	= require('express');
const router 	= express.Router();

router.get('*',  (req, res, next)=>{
	if(req.cookies['userlist'] == undefined){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	res.render('home/index', {name: 'alamin', id:'123'});	
});


router.get('/userlist', (req, res)=>{
	res.render('home/userlist', {users: req.cookies['userlist']});
})

module.exports = router;