'use strict'

var express = require('express');
var bodyParse = require('body-parser');

var app = express();

//Cargar Rutas
var user_routes = require("./routes/User");
var artist_routes = require("./routes/Artist");


app.use(bodyParse.urlencoded({	extended : false}));
app.use(bodyParse.json());

//Configurar Cabeceras http


//Rutas Base

app.use("/api",user_routes);
app.use("/api",artist_routes);



module.exports = app;
