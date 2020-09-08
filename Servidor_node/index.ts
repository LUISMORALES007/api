import Server from "./Classes/server";
import userRoutes from "./routes/usuario";
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import postRoutes from "./routes/post";
import fileUpload from 'express-fileupload';
import cors from 'cors';

const server = new Server();
//body parser

server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//fileUpload

server.app.use(fileUpload());

//configuracion cors

server.app.use(cors({
     
    origin:true,
    credentials:true

}));

//conectar a base de datos


mongoose.connect(/*'mongodb://localhost:27017/proyectoChiaApi'*/'mongodb+srv://Admin:Admin123_@apichia2020.e6rzq.mongodb.net/apichia2020?retryWrites=true&w=majority',{
 
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true 

},(err)=>{

     if(err) throw err;

     console.log('base de datos conectada');
})

//rutas de la app
server.app.use('/user',userRoutes);
server.app.use('/posts',postRoutes);

server.start(()=>{

    console.log(`servidor arriba en puerto ${server.port}`);

});