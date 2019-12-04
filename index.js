const express = require('express');
const helmet = require('helmet');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var maxtempatparkir = 10;

var obj = {
   //table: [],
   tabletempatparkir: [],
   //tabledetailparkir: []
};

var json = JSON.stringify(obj);

var fs = require('fs');
// fs.writeFile('myjsonfile.json', json, 'utf8');

/*fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
  		obj = JSON.parse(data); //now it an object
  		for(var a = 1; a <= maxtempatparkir; a++){
  		  obj.tabletempatparkir.push({slotparkir: 'A'+a, tabledetailparkir: ''});
        //obj.tabletempatparkir.push({'A': []});
  		}
  		json = JSON.stringify(obj); //convert it back to json
  		fs.writeFile('myjsonfile.json', json, 'utf8'); // write it back
	  }
});*/


app.get('/persons/:username', function(req, res){
    var param_username = req.params.username;
	  res.send(param_username);
});

app.get("/", function(req, resp){
    var tes = fs.readFileSync('myjsonfile.json', 'utf8');
    var json = JSON.parse(tes);
    resp.json(json);
    console.log(json)
	   /*const loadData = (path) => {
  	   try {
  		    return fs.readFileSync(path, json 'utf8')
  	   } catch (err) {
  		    console.error(err)
  		    return false
  	   }
	   }*/
});

var parkir = require('./router/parkir');
app.use('/parkir', parkir);

const port = process.env.PORT || 4000;

app.listen(port, function(){
  console.log(`Server sudah jalan di port ${port}`);
});
