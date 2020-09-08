"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    created: {
        type: String
    },
    mensaje: {
        type: String
    },
    img: [{
            type: String
        }],
    coords: {
        type: String
    },
    usuario: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe existir una relacion a un usuario']
    }
});
postSchema.pre('save', function (next) {
    this.created = new Date().toLocaleString();
    next();
});
exports.Post = mongoose_1.model('Post', postSchema);
