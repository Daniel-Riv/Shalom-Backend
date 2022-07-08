const  {Router}= require('express');
const multer = require('multer');
const {createProduct,getProducts,getProduct,updateProduct,deleteProduct}= require('../controller/product');
const router = Router();

const upload = multer({dest: './public'});

router.post('/add',upload.array('image',1),createProduct);
router.get('/all',getProducts);
router.get('/:code',getProduct);
router.put('/updateProduct/:code',updateProduct);
router.delete('/deleteProduct/:code',deleteProduct);

module.exports = router;