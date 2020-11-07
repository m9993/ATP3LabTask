const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = "";
	//res.cookie('uname', '');
	
	// res.clearCookie('userlist');
	req.session.destroy(()=>{
		res.redirect('/login');
	});
	// res.redirect('/login');
});


module.exports = router;



