'user strict'
var fs = require('fs');
var path = require('path');
var mongoosepaginate = require('mongoose-pagination');
var Artist = require("../Models/artist");
var Album = require("../Models/album");
var Song = require("../Models/song");


function getArtist(req,res)
{
   var artistId = req.params.id;
   
   Artist.findById(artistId,(err,artistStore)=>{
      if(err)
         res.status(500).send({message:'Error en la peticion'});
      else{
         if(!artistStore){
            res.status(404).send({message:'El artista no existe'});
         }else{
            res.status(200).send({artistStore});
         }
      }

   });
}

function getArtists(req,res)
{
   var page = 1;
   var itemsPage = 5;
   
   if(req.params.page)
      page = req.params.page;
   
   Artist.find().sort('name').paginate(page,itemsPage, function(err,artists,total){
      if(err){
         res.status(500).send({message:'Error en la peticion'});
      }else{
         if(!artists){
            res.status(404).send({message:'No hay artista'});
         }else{
            return res.status(200).send(
               {total: total,
                artist : artists
               }
            );
         }
      }
   });
}

function saveArtist(req,res){
   console.log(Artist); 
   var artist = new Artist();
   var params = req.body;
   console.log(params);

   artist.name = params.name;
   artist.description = params.description;
   artist.image = null;

   artist.save((err,artistStore)=>{
   if(err){
     res.status(500).send({message:'error al guardar el artista'});
   }
   else{
      if(!artistStore){
         res.status(404).send({message:'El artista no ha sido guardado'});
      }else{
         res.status(200).send({message:'artista guardado correctamente',artist:artistStore});
      }
   }
   });    
}

module.exports ={
    getArtist,
   saveArtist,
   getArtists
}