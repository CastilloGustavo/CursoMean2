'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SongSchema = Schema(
{
	number : String,
	name : String,
	duration : String,
	file : String,
	image : String,
	album : { type : Schema.ObjectId , ref : 'Album'}
}); 


module.export = mongoose.model('Song',SongSchema);