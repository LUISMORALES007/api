
import {Schema,model,Document} from 'mongoose';

const postSchema = new Schema({

     created:{
         type:String
     },

     mensaje:{

        type:String
     },

     img:[{

        type:String
     }],
     coords:{

        type:String
     },
     usuario:{

        type: Schema.Types.ObjectId,
         ref:'Usuario',
        required:[true, 'Debe existir una relacion a un usuario']
     }

});

postSchema.pre<IPost>('save', function(next){

    this.created =  new Date().toLocaleString();
    next();

});

interface IPost extends Document{

    created: string;
    mensaje: string;
    img:string[];
    coords:string;
    usuario:string;
}

export const Post = model<IPost>('Post',postSchema);