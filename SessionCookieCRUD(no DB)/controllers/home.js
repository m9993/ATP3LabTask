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
	res.render('home/index', {name: req.session.uname, id: req.session.uid});	
});


router.get('/userlist', (req, res)=>{
	res.render('home/userlist', {users: req.cookies['userlist']});
})

module.exports = router;