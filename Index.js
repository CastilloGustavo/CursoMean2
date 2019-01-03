'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

mongoose.connect('mongodb://localhost:27017/curso-mean2',(err,res)=>{
	if(err)
	{
		throw err;
	}else
	{
		console.log("Base Conectada correctamente...");
		app.listen(port , function(){
			console.log("El Servidor rest Musica  se encuentra corriendo correctamente..");
			//console.log('http://localhost:' + port);
		});
	}
});
