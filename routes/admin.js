const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post(
    '/add-product',
    isAuth,
    [
        body(
            'title',
            'Please enter a title with only numbers and text and at least 2 characters.'
        )
            .isLength({ min: 2 })
            .trim(),

        body('price', 'Price must always be greater than 0.').isFloat({
            min: 0.01,
        }),

        body('description', 'Description must be minimum of 5 letters.')
            .isLength({ min: 5 })
            .trim(),
    ],

    adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post(
    '/edit-product',
    isAuth,
    [
        body(
            'title',
            'Please enter a title with only numbers and text and at least 2 characters.'
        )
            .isLength({ min: 2 })
            .trim(),

        body('price', 'Price must always be greater than 0.').isFloat({
            min: 0.01,
        }),

        body('description', 'Description must be minimum of 25 letters.')
            .isLength({ min: 5 })
            .trim(),
    ],
    adminController.postEditProduct
);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
