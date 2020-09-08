import { Router,Response } from "express";
import { verificaToken } from "../middlewares/autenticacion";
import { Post } from "../models/post.model";
import { FileUpload } from "../interfaces/file-upload";
import FileSystem from "../Classes/file-system";


const postRoutes = Router();
const fileSystem = new FileSystem();

//obtener post paginados
postRoutes.get('/',async (req:any, res: Response)=>{

    let pagina = Number(req.query.pagina) || 1;
    let skip = pagina -1;
    skip = skip * 10;

   const posts = await Post.find()
                           .sort({_id:-1})
                           .limit(10)
                           .skip(skip)
                           .populate('usuario','-password')
                           .exec();

  res.json({

    ok:true,
    pagina,
    posts
  })

});


//crear post
postRoutes.post('/',[verificaToken],(req:any, res: Response)=>{

   const body = req.body;
   body.usuario= req.usuario._id;

   const imagenes = fileSystem.imagenesdeTempHaciaPost(req.usuario._id);

   body.img = imagenes;


   Post.create(body).then(async postBD =>{

    await postBD.populate('usuario','-password').execPopulate();

    res.json({

        ok:true,
        post: postBD
      });
   }).catch(err=>{

       res.json(err)
   });


  

});

// servicio subir archivo

postRoutes.post('/upload',[verificaToken],async (req:any, res: Response)=>{

  if(!req.files){
      
       return res.status(400).json({

         ok:false,
         mensaje:'No se subio ningun archivo'
       });
  }

  const file: FileUpload = req.files.image;

  if(!file){

    return res.status(400).json({

      ok:false,
      mensaje:'No se subio ningun archivo - image'
    });

  }

  if(!file.mimetype.includes('image')){

    return res.status(400).json({

      ok:false,
      mensaje:'El archivo que quiere subir no es una imagen'
    });

  }

  await fileSystem.guardarImagenTemporal(file, req.usuario._id);

    res.json({

      ok:true,
      file: file.mimetype

    });

});

postRoutes.get('/imagen/:userid/:img', (req:any,res:Response)=>{

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl(userId,img);

    res.sendFile(pathFoto);
});

export default postRoutes;