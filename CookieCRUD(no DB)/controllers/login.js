const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	if(req.body.username == req.body.password){
		if(req.cookies['userlist']==undefined){
			var userlist = [
				['1', 'abc', 'abc@gmail.com', '1243'],
				['2', 'pqr', 'pqr@gmail.com', '1243'],
				['3', 'xyz', 'xyz@gmail.com', '1243']
			];
			res.cookie('userlist', userlist);			//SET COOKIE
			// console.log(req.cookies['userlist']);	//GET COOKIE
		}
		res.redirect('/home');

		//req.session.userlist = userlist;
	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



