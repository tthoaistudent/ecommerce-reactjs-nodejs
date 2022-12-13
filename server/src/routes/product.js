const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('', productController.getAllProduct);
router.get('/:id', productController.getOneProduct);
router.post('',productController.addProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.updateProduct);

module.exports = router;