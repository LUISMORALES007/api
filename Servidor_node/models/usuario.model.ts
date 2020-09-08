
import {Schema,model,Document} from 'mongoose';
import bcryp from 'bcrypt';
const usuarioSchema = new Schema({
    
    nombre:{
          type:String,
          required:[true, 'el nombre es requerido']
    },
    avatar:{
          type: String,
          default:'av-1.png'
    },
    email:{
          type: String,
          unique:true,
          required:[true, 'el correo es requerido']

    }, 
    password:{
        type: String,
        required:[true, 'La contraseña es obligatoria']

  }
    


});


usuarioSchema.method('compararContrasena',function(password: string=''):boolean{

  if(bcryp.compareSync(password,this.password) ){
      
      return true;

  }else{

      return false;
  }


});


interface IUsuario extends Document{
    
    nombre:string;
    email:string;
    password:string;
    avatar:string;
    
    compararContrasena(password:string):boolean;
}

export const Usuario = model<IUsuario>('Usuario',usuarioSchema);

