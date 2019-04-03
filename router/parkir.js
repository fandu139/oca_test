var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.json());

// http://localhost:1337/parkir/get_parkir/D101
router.get('/get_parkir/:platmobil', function(req, resp, next) {

	var plat = req.params.platmobil;

	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
			if (err){
					console.log(err);
			} else {
				obj = JSON.parse(data); //now it an object

				var res = {};

				obj.tabletempatparkir.forEach(function(item, index, array){
						if (item.platmobil === plat){

							var biayaparkir = 1;
							var masuk = item.tanggal_masuk;

							const date = new Date();
							var keluar = date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes();

							var selisih = Math.floor((new Date(keluar) - new Date(masuk)) / 1000 / 60 / 60);

							if (item.tipe === "SUV"){
									biayaparkir = 25000;
							} else if (item.tipe === "MPV"){
									biayaparkir = 35000
							}

							var biaya = biayaparkir;
							if (selisih > 1){
								biaya = ((selisih - 1) * (biayaparkir * 20 /100)) + biayaparkir;
							} else {
								biaya = biayaparkir;
							}


							res = {
								platmobil : item.platmobil,
								tanggal_masuk : masuk,
								tanggal_keluar : keluar,
								total : biaya
							}
						}

				});
				resp.send(res);

			}
	});
});

// http://localhost:1337/parkir/get_tipe_mobil/SUV
router.get('/get_tipe_mobil/:tipe', function(req, resp, next) {

	var tipe = req.params.tipe;

	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
			if (err){
					console.log(err);
			} else {
				obj = JSON.parse(data); //now it an object

				var res = {};
				var summobil = 0;

				obj.tabletempatparkir.forEach(function(item, index, array){
					if (item.tipe === tipe){
						summobil++;
					}
				});
				
				res = {
					jumlah_kendaraan : summobil
				}
				
				resp.send(res);

			}
	});
});

// http://localhost:1337/parkir/get_warna_mobil/hitam
router.get('/get_warna_mobil/:warna', function(req, resp, next) {

	var warna = req.params.warna;

	fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
			if (err){
					console.log(err);
			} else {
				obj = JSON.parse(data); //now it an object

				var res = {};
				
				const warnamobil = [];

				obj.tabletempatparkir.forEach(function(item, index, array){
					if (item.warna === warna){
						warnamobil.push(item.platmobil);
					}
				});
				
				res = {
					plat_nomor : warnamobil
				}
				
				resp.send(res);

			}
	});
});

router.post('/post_parkir', function(req, resp) {
    var plat = req.body.plat;
    var warna = req.body.warna;
    var tipe = req.body.tipe;

		fs.readFile('myjsonfile.json', 'utf8', function readFileCallback(err, data){
				if (err){
						console.log(err);
				} else {
					obj = JSON.parse(data); //now it an object

					const date = new Date();

					var a = obj.tabletempatparkir.length + 1;
					var res = {
						ruangparkir : 'A'+a,
						platmobil : plat,
						warna : warna,
						tipe : tipe,
						tanggal_masuk : date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()
					};

					//obj.tabletempatparkir.push({ id: a , parkir: [res]});
					obj.tabletempatparkir.push(res);

		  		json = JSON.stringify(obj); //convert it back to json

		  		fs.writeFile('myjsonfile.json', json, 'utf8'); // write it back

					resp.send(res);

				}
		});
});

module.exports = router;
