"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./Classes/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const post_1 = __importDefault(require("./routes/post"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const server = new server_1.default();
//body parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//fileUpload
server.app.use(express_fileupload_1.default());
//configuracion cors
server.app.use(cors_1.default({
    origin: true,
    credentials: true
}));
//conectar a base de datos
mongoose_1.default.connect(/*'mongodb://localhost:27017/proyectoChiaApi'*/ 'mongodb+srv://Admin:Admin123_@apichia2020.e6rzq.mongodb.net/apichia2020?retryWrites=true&w=majority', {
    useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true
}, (err) => {
    if (err)
        throw err;
    console.log('base de datos conectada');
});
//rutas de la app
server.app.use('/user', usuario_1.default);
server.app.use('/posts', post_1.default);
server.start(() => {
    console.log(`servidor arriba en puerto ${server.port}`);
});
