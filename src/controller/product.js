const Product = require('../models/Product');
const cloudinary = require('../helper/cloudinary');

const createProduct = async (req, res) => {
    try {
        const { public_id,secure_url} = await cloudinary.uploader.upload(req.files[0].path);
        const { code,nameProduct, price, cant, category,description } = req.body;
        const product = new Product({
            code, 
            nameProduct,
            price,
            cant,
            category,
            description,
            img: secure_url,
            public_id
        });
        await product.save();
        return res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }

}
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            success: true,
            products
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

const getProduct = async (req, res) => {
    try {
        const { code } = req.params;
        const product = await Product.findOne({code:code});
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "El producto no existe"
            });
        }else{
            return res.status(200).json({
                success: true,
                product
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { code } = req.params;
        const {nameProduct,price,cant,img,category,description} = req.body;
        let product = await Product.findOneAndUpdate({code:code},{ nameProduct,price,cant,img,category,description});
        if (product.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "El producto no existe"
            });
        }else{

            return res.status(200).json({
                success: true,
                result: product
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { code } = req.params;
        const product = await Product.findOneAndDelete({code:code});
        
        if (!product) {
            return res.status(404).json({
                success: false,
                msg: "El producto no existe"
            });
        }else{
            cloudinary.uploader.destroy(product.public_id);
            return res.status(200).json({
                success: true,
                result: product
            });
        }
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

module.exports = {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
