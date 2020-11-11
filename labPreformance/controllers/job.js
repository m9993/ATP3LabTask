const express       = require('express');
const jobModel      = require.main.require('./models/jobModel');
const router        = express.Router();

router.get('*', (req, res, next)=>{
    if(req.session.uname==undefined){
        res.redirect('/login');
    }else{
        next();
    }
});

router.get('/create', (req, res)=>{
    res.render('job/create');
});

router.post('/create', (req, res)=>{

    var job={
        companyname: req.body.companyname,
        jobtitle: req.body.jobtitle,
        joblocation: req.body.joblocation,
        salary:req.body.salary
    }
    jobModel.insert(job, (status)=>{
        if(status){
            res.redirect('/home/employee');
        }else{
            res.send('insert failed');
        }
    });
});

router.get('/edit/:id', (req, res)=>{
    var id=req.params.id;
	jobModel.getById(id,(results)=>{		
		res.render('job/edit', results[0]);
	});
});

router.post('/edit/:id', (req, res)=>{
	var job={
		id: req.params.id,
		companyname: req.body.companyname,
		jobtitle: req.body.jobtitle,
		joblocation: req.body.joblocation,
		salary: req.body.salary
    };
    jobModel.update(job,(status)=>{
		if(status){
			res.redirect('/home/employee');
		}else{
			res.send('update failed');
		}
    });    
});

router.get('/delete/:id', (req, res)=>{
	var id=req.params.id;
	jobModel.getById(id,(results)=>{		
		res.render('job/delete', results[0]);
	});
});

router.post('/delete/:id', (req, res)=>{
	jobModel.delete(req.params.id,(status)=>{
		if(status){
			res.redirect('/home/employee');
		}else{
			res.send('delete failed');
		}
	});
});

module.exports=router;