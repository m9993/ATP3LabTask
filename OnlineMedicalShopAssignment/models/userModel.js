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
    insert: (user,callback)=>{
        var sql="INSERT INTO `user`(`uname`, `uemail`, `urole`, `ustatus`, `upassword`, `uphone`) VALUES ('"+user.uname+"','"+user.uemail+"','"+user.urole+"','"+user.ustatus+"','"+user.upassword+"','"+user.uphone+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
    getAllUser: (callback)=>{
        var sql="select * from user";
        db.getResults(sql, (results)=>{
			callback(results);
        });
    },

}