const db    = require('./db');

module.exports={
    insert: (order,callback)=>{
        var sql="INSERT INTO `orders`(`uid`, `otime`, `opaymentmethod`, `ostatus`, `oamount`, `oaddress`) VALUES ('"+order.uid+"', NOW(), '"+order.opaymentmethod+"', '"+order.ostatus+"', '"+order.oamount+"', '"+order.oaddress+"')";
        db.execute(sql,(status)=>{
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
    },
   

}