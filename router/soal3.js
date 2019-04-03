var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var connection = mysql.createPool({
	connectionLimit: 50,
	host: '127.0.0.1',
	user: 'root',
	password: '',
	database: 'tokocrypto'
});

// http://localhost:1337/soal3/get_users
router.get('/get_users', function(req, resp, next) {
	connection.getConnection(function(error, tempCount){
  		if(!!error){
  			tempCount.release();
  		}else{
  			tempCount.query('select * from user', function(error, row, fields){
  				if(!!error){
  					console.log('Error in query');
  				}else{
  					console.log('Success');

  					var students = {"tampil":row}

  					resp.json(students);
  				}
  			});
  		}
  	});
});

// http://localhost:1337/soal3/get_user/fandu
router.get('/get_user/:name', function(req, resp, next) {
	var name = req.params.name;
	connection.getConnection(function(error, tempCount){
  		if(!!error){
  			tempCount.release();
  		}else{
  			tempCount.query('select * from user where name="'+name+'"', function(error, row, fields){
  				if(!!error){
  					console.log('Error in query');
  				}else{
  					console.log('Success');

  					var students = {"tampil":row}

  					resp.json(students);
  				}
  			});
  		}
  	});
});

router.post('/post_users', function(req, resp) {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
	var address = req.body.address;
    var phone = req.body.phone;
    connection.getConnection(function (error, tempCount){
		if(!!error){
			tempCount.release();
			console.log('Error');
		}else{
			console.log('Conncected');
			tempCount.query("INSERT INTO `tokocrypto`.`user` (`id`, `name`, `email`, `password`, `address`, `phone`, `created_at`, `updated_at`) VALUES (NULL, '"+name+"', '"+email+"', left(password('"+pass+"'),10), '"+address+"', '"+phone+"', 'NOW()', '')",
			function(error, row, fields){
				if(!!error){
					console.log('Error in query');
				}else{
					console.log("Success");
					resp.send("Success");
				}
			});
		}
	});      	
});

// http://localhost:1337/soal3/put_user/fandu
router.put('/put_user/:name', function(req, resp, next) {
	var name = req.params.name;
	
    var email = req.body.email;
	
	connection.getConnection(function(error, tempCount){
  		if(!!error){
  			tempCount.release();
  		}else{
  			tempCount.query('update user set email="'+email+'", updated_at=NOW() where name="'+name+'"', function(error, row, fields){
  				if(!!error){
  					console.log('Error in query');
  				}else{
  					console.log('Success');

  					var students = {"tampil":row}

  					resp.json(students);
  				}
  			});
  		}
  	});
});

router.delete('/delete_user/:name', function(req, resp){
    var name = req.params.name;

    connection.getConnection(function(error, tempCount){
  		if(!!error){
  			tempCount.release();
  		}else{
  			tempCount.query('DELETE FROM user WHERE name="'+name+'"', function(error, row, fields){
  				if(!!error){
  					console.log('Error in query');
  				}else{
  					console.log('Success');

  					var students = {"tampil":row}

  					resp.json(students);
  				}
  			});
  		}
  	});
});

module.exports = router;
