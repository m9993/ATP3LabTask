const db = require('./db');

module.exports= {
	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from user where id= '"+id+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getUser: function(username, callback){
		var sql = "select * from user where username= '"+username+"'";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	getAll: function(callback){
		var sql = "select * from user";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){
		var sql="INSERT INTO user(name, companyname, contactno, username, password, role) VALUES ('"+user.name+"','"+user.companyname+"','"+user.contactno+"','"+user.username+"','"+user.password+"','"+user.role+"')";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update:function(user, callback){
		var sql="UPDATE user SET name='"+user.name+"',companyname='"+user.companyname+"',contactno='"+user.contactno+"',username='"+user.username+"',password='"+user.password+"',role='"+user.role+"' WHERE id='"+user.id+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(id, callback){
		var sql="DELETE FROM user WHERE id='"+id+"'";
		db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	search: function(searchKey, callback){
		var sql="select * from user where name like '%"+searchKey+"%'";
		db.getResults(sql, (results)=>{
			callback(results);
		});

	}
}