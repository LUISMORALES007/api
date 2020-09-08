import { Router,Request,Response } from "express"
import { Usuario } from "../models/usuario.model";
import bcryp from 'bcrypt';
import Token from "../Classes/token";
import { verificaToken } from "../middlewares/autenticacion";

const userRoutes = Router();

//iniciar sesion

userRoutes.post('/iniciarSesion',(req:Request ,res :Response)=>{
   
    const body = req.body;

    Usuario.findOne({email: body.email},(err,userBD)=>{

      if(err) throw err;
      
      if(!userBD){
        
        return res.json({
                ok:false,
                mensaje:'Usuario / Contraseña no son correctos'
        });

      }
       
      if(userBD.compararContrasena(body.password)){
             

        const tokenUser = Token.getJwtToken({

             _id: userBD._id,
             nombre:userBD.nombre,
             email: userBD.email, 
             avatar:userBD.avatar

        });

        res.json({

           ok: true,
           token:tokenUser

        });
       }else{

             return res.json({
            ok:false,
            mensaje:'Usuario / Contraseña no son correctos'
             });

       }


    });


});


//crear usuario
userRoutes.post('/crearUsuario',(req:Request ,res :Response) =>{
    
    const user = {

       nombre     :req.body.nombre,
       email      :req.body.email,
       password   :bcryp.hashSync(req.body.password,10),
       avatar     :req.body.avatar

    };

    Usuario.create(user).then(userBD => {


      const tokenUser = Token.getJwtToken({

        _id: userBD._id,
        nombre:userBD.nombre,
        email: userBD.email, 
        avatar:userBD.avatar

   });

   res.json({

      ok: true,
      token:tokenUser

   });

       
         
    }).catch(err =>{

        res.json({

            ok: false,
            mensaje: "El correo electronico que desea registrar ya existe ..",
            err
    
         });

    });

});


//Actualizar usuario

userRoutes.post('/actualizarUsuario',verificaToken,(req:any ,res :Response)=>{
  
  const user = {

    nombre: req.body.nombre || req.usuario.nombre,
    email: req.body.email || req.usuario.email,
    avatar:req.body.avatar|| req.usuario.avatar

  }

  Usuario.findByIdAndUpdate(req.usuario._id,user,{new:true},(err,userBD)=>{

    if(err) throw err;

    if(!userBD){

      return res.json({

            ok:false,
            mensaje:'No existe un usuario con ese ID'

      });
    }

    const tokenUser = Token.getJwtToken({

      _id: userBD._id,
      nombre:userBD.nombre,
      email: userBD.email, 
      avatar:userBD.avatar

 });

      res.json({

          ok: true,
          token:tokenUser

      });

  });


});

userRoutes.get('/', [verificaToken], (req:any,resp: Response)=> {

  const usuario = req.usuario;

    resp.json({

       ok: true,
       usuario
    });

});

export default userRoutes;