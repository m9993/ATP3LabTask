const db    = require('./db');

module.exports={
    validate: (user, callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			if(results.length >0 ){
				callback(true);
			}else{
				callback(false);
			}
        });
    },
    getUser: (user,callback)=>{
        var sql="select * from user where uemail='"+user.uemail+"' and upassword='"+user.upassword+"'";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },

}