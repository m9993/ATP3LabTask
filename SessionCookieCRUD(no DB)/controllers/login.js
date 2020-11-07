const express 	= require('express');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index');
});

router.post('/', (req, res)=>{

	var userlist = [
		['1', 'abc', 'abc@gmail.com', '123'],
		['2', 'pqr', 'pqr@gmail.com', '123'],
		['3', 'xyz', 'xyz@gmail.com', '123']
	];
	
	if(req.cookies['userlist']==undefined){
		req.session.userlist=userlist;
		res.cookie('userlist',req.session.userlist);
	}else{
		req.session.userlist=req.cookies['userlist'];
	}


	/* 
		--------COOKIE------(cookie clears automatically when browser is closed)---------
			res.cookie('userlist', userlist);						//SET COOKIE
			req.cookies['userlist']									//GET COOKIE
			req.cookies.userlist									//GET COOKIE (another way)
			res.clearCookie('userlist');							//CLEAR COOKIE
			
			
		----------SESSION----------
			req.session.userlist = userlist;						//SET SESSION
			req.session.userlist;									//GET SESSION
			req.session.destroy(()=>{res.redirect('/login');});		//CLEAR SESSION
	*/
	
		
	/*Can not get cookies until the page reloads(Ex. first load getting undefined). Because Cookie sets on local machine
	whereas session sets on server side. Session has not this problem. Session is secure.*/
	
	

	var flag =false;
	req.session.userlist.forEach( (user)=>{
		if(req.body.username == user[1] && req.body.password == user[3]){
			req.session.uname=user[1];
			req.session.uid=user[0];
			flag=true;			
		}
	});	
	if(flag==true){
		res.redirect('/home');
	}else{
		res.redirect('/login');
	}
}); 


module.exports = router;



