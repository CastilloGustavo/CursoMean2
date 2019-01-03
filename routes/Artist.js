'use strict'

var express = require('express');
var artistController = require("../Controllers/Artist");
var api = express.Router();
var md_auth = require("../MiddleWares/authenticated");



api.get('/artist',md_auth.ensureAuth,artistController.getArtist);


module.exports = api;