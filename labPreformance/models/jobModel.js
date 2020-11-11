const db = require('./db');

module.exports={
	getAll: (callback)=>{
		var sql= "select * from job";
		db.getResults(sql,(results)=>{
			callback(results);
		});
	},

	insert:(job, callback)=>{
		var sql ="INSERT INTO `job`(`companyname`, `jobtitle`, `joblocation`, `salary`) VALUES ('"+job.companyname+"','"+job.jobtitle+"','"+job.joblocation+"','"+job.salary+"')";
		db.execute(sql, (status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getById: function(id, callback){
		var sql = "select * from job where id= '"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},

	update:function(job, callback){
		var sql="UPDATE job SET companyname='"+job.companyname+"', jobtitle='"+job.jobtitle+"', joblocation='"+job.joblocation+"', salary='"+job.salary+"' WHERE id='"+job.id+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	delete: function(id, callback){
		var sql="DELETE FROM job WHERE id='"+id+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}