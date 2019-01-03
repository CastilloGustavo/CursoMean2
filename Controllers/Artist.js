'user strict'
var fs = require('fs');
var path = require('path');

var Artist = require("../Models/artist");
var Album = require("../Models/album");
var Song = require("../Models/song");


function getArtist(req,res)
{
    res.status(200).send({message:'Metodo Get Artist Controllador'});
}


module.exports ={
    getArtist
}