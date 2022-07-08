const { Schema, model } = require('mongoose');

const ProductShema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    nameProduct: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    cant:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:['SALAS','COMEDORES','CAMAS','SOFACAMAS','SILLAS','ESPEJOS','MESADENOCHE','ACCESORIOS']
    },
    img:{
        type:String,
        required:true,
    },
    public_id:{
        type:String,
        required:true,
    }
    
});
module.exports = model('Product', ProductShema);