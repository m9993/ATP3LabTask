const db = require('./db');

module.exports= {
	getById: function(id, callback){

	},
	getAll: function(callback){
		var sql = "select * from job";
		db.getResults(sql, function(results){
			callback(results);
		});
	},
	insert: function(user, callback){

	},
	update:function(user, callback){

	},
	delete: function(id, callback){

	}
}