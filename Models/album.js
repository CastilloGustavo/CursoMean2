'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.schema;

var AlbumSchema = Schema(
{
	title : String,
	description : String,
	image : String,
	year : Number,
	image : String,
	artist : { type : Schema.ObjectId , ref : 'Artist'}
}); }


module.export = mongoose.model('Album',AlbumSchema);