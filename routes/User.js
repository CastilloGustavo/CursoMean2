'use strict'

var express = require('express');

var userController = require("../Controllers/User");
var md_auth = require("../MiddleWares/authenticated");

var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir:'./uploads/users'});

var api = express.Router();

api.get('/probando-controlador', md_auth.ensureAuth ,userController.pruebas);


api.post('/register',userController.saveUser);
api.post('/login',userController.loginUser);
api.post('/upload-image-user/:id',[md_auth.ensureAuth,md_upload],userController.uploadImage)
api.get('/get-image-user/:imageFile',userController.getImageFile)


api.put('/update-user/:id',md_auth.ensureAuth,userController.updateUser)

module.exports = api;