'use strict'

var mongoose = require('mongoose');
var app = require('./app');
//var dns = require('dns');

var port = process.env.PORT || 8080;
console.log(port);

mongoose.connect('mongodb://localhost:27017/curso-mean2',(err,res)=>{
	if(err)
	{
		throw err;
	}else
	{
		console.log("Base Conectada correctamente...");

      var http = require('http').Server(app).listen(port , function(){
			console.log("El Servidor rest Musica  se encuentra corriendo correctamente..");
			//console.log('http://localhost:' + port);
		});
	}
});
