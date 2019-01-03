'user strict'
var bcrypt = require("bcrypt-nodejs");
var User = require("../Models/user");
var jwt = require("../Services/jwt");

function pruebas(req,res)
{
	res.status(200).send({
		message:"Probando accion de controlador Node y MongoDb"
	});
};

function saveUser(req,res)
{
	var user = new User();
	var params = req.body;

	console.log(params);

	user.name = params.name;
	user.surname= params.surname;
	user.email = params.email;
	user.role = "ROLE_ADMIN";
	user.imagen = "null";

	if(params.password)
	{//Encriptar Contraseña
		bcrypt.hash(params.password,null,null,function(err,hash){
			user.password = hash;
			if(user.name != null && user.surname != null && user.email != null){
				//guardar usuario
				user.save((err,userStored)=>{
					if(err){
						res.status(500).send({message:"Error al guardar el Usuario"});
					}else{
						if(!userStored)
						{
							res.status(404).send({message:"No se pudo persitir el Usuario"});							
						}else{
							res.status(200).send({user:userStored});
						}
					}
				});
			}else{
				res.status(200).send({message:"Introduce los datos Obligatorios"});
			}
		});
	}else{
		res.status(200).send({message:"Introducior Contraseña"});
	}
};

function loginUser(req,res){	
	var params = req.body;
	var emailParam = params.email;
	var password = params.password;

	User.findOne({email : emailParam.toLowerCase()},(err,user) => {
		if(err)
		{
			res.status(500).send({message : 'Error en la Peticion'});
		}else
		{
			if(!user)
			{
				res.status(404).send({message : 'El Usuario no Existe'});
			}else
			{
				//Comprobar Contraseñan
				bcrypt.compare(password,user.password , function(err,check){
					if(check)
					{
						//Dovolver Datos de Usuario Logueado
						if(params.gethash)
						{
							//Devolver un toker de jwt
							res.status(200).send({
								token: jwt.createToken(user),
								user: user
							})
						}else
						{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message : 'La password ese incorrecta'});
					}
				});
			}
		}
	});

}

function updateUser(req,res)
{
	var userId = req.params.id;
	var update = req.body;
	
	User.findByIdAndUpdate(userId, update, (err,userUpdate) =>{
		if(err)
		{
			res.status(500).send({message : 'Error al actualizar Usuario'});
		}else{
			if(!userUpdate){
				res.status(404).send({message : 'No se a podido actualizar el usuario'});
			}else{
				res.status(200).send({user : userUpdate});
			}
			
		}
		
	});
}

function uploadImage(req,res)
{
    var userId = req.params.id;
    var file_name = 'No subido';
    
    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\'); 
        var file_name = file_split[2];
        
        var extension = file_name.split('.')[1];
        if(extension == 'png'|| extension == 'jpg' || extension == 'gif' ){
            User.findByIdAndUpdate(userId,{imagen:file_name},(err,userUpdate) =>{                
                if(err)
                {
                    res.status(500).send({message : 'Error al actualizar Usuario'});
                }else{
                    if(!userUpdate){
                        res.status(404).send({message : 'No se a podido actualizar el usuario'});
                    }else{
                        res.status(200).send({user : userUpdate});
                    }

                }                
            });
        }else{
            res.status(200).send({message:"Extension del archivo no validad"});
        }
        
    }else{
        res.status(200).send({message:"No ha subido ninguna imagen"});
    }
    
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser,
    uploadImage

};