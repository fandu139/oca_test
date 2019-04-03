const express = require('express');
const helmet = require('helmet');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*var objparkir = {
   tablemaxparkir: []
};

objparkir.tablemaxparkir.push({max: 10});

var jsonparkir = JSON.stringify(objparkir);*/

var maxtempatparkir = 10;

var obj = {
   table: [],
   tabletempatparkir: [],
   tabledetailparkir: []
};

obj.table.push({id: 1, square:2});
//obj.tabletempatparkir.push({max: 10});

var json = JSON.stringify(obj);


var fs = require('fs');
fs.writeFile('myjsonfile.json', json, 'utf8');
//fs.writeFile('myjsonfile.json', jsonparkir, 'utf8');

fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
		obj = JSON.parse(data); //now it an object
		obj.table.push({id: 2, square:3}); //add some data
		for(var a = 1; a <= maxtempatparkir; a++){
			obj.tabletempatparkir.push({slotparkir: 'A'+a, platmobil: ''});
		}
		json = JSON.stringify(obj); //convert it back to json
		fs.writeFile('myjsonfile.json', json, 'utf8'); // write it back 
	}
});


app.get('/persons/:username', function(req, res){
    var param_username = req.params.username;
	res.send(param_username);
    
});

app.get("/", function(req, resp){
    resp.send("masuk");
	var path = 'myjsonfile.json';
	const loadData = (path) => {
	  try {
		return fs.readFileSync(path, json 'utf8')
	  } catch (err) {
		console.error(err)
		return false
	  }
	}
});

var fibonacci = [];

app.get("/soal1", function(req, resp){

  var xn = 0;
  var a = 0;
  var b = 1;
  var limit = 10

  for(z=0; z<limit; z++){
    xn = a + b ;
    view(xn);
    a = b;
    b = xn;
  }

  resp.send(fibonacci);

});

function view(xn) {
  fibonacci.push(xn);
  console.log("masuk fandu = "+xn);
}

app.get("/soal2", function(req, resp){

  var a = [1, 2, 0, 5, 8, 1, 3];
  var b = [3, 0, 7, 5, 1, 9];

  var benar = 0;
  var salah = 0;

  b.forEach(function(item, index, array){
    var status = false;
    a.forEach(function(item_a, index_a, array_a){
      if ( item === item_a){
        status = true;
      }
    });
    console.log("soal nomor 2 = apakah tabel B yaitu "+item+" subarray dari tabel A = "+status);

    if (status){
      benar++;
    } else {
      salah++;
    }

  });

  resp.send("Jumlah Array Benar "+ benar +" dan Salah "+salah);

});

var soal3 = require('./router/soal3');
app.use('/soal3', soal3);


app.listen(1337, function(){
  console.log("Server sudah jalan di port 1337");
});
