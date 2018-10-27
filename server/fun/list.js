var pool = require("./pool.js")

var  sql = 'SELECT * FROM websites';
//查
exports.list = function() {
	console.log(1);
	pool.query(sql,function (err, result) {
			if(err){
			console.log('[SELECT ERROR] - ',err.message);
			return;
			}
		console.log('--------------------------SELECT----------------------------');
		console.log(result);
		console.log('------------------------------------------------------------\n\n');  
	});
}