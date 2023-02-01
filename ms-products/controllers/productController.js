import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}

  const products = await Product.find({ ...keyword });

  res.json({ products })
})

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404);
    throw new Error('El producto no ha sido encontrado');
  }

  res.json(product);
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404);
    throw new Error('El producto no ha sido encontrado');
  };

  await product.remove();
  res.json({ message: 'El producto ha sido eliminado' });
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const {
    user,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const productExists = await Product.findOne({ name });

  if (productExists) {
    res.status(400);
    throw new Error('El producto ya ha sido registrado');
  };

  const product = await Product.create({
    user,
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  })

  if (!product) {
    res.status(400);
    throw new Error('Los datos ingresados son incorrectos');
  };

  res.status(201).json("El producto ha sido creado.");
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body

  const product = await Product.findById(req.params.id)

  if (!product) {
    res.status(404);
    throw new Error('El producto no ha sido encontrado');
  };

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();
  res.json(updatedProduct);
})

// @desc    Create new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment, name } = req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('El producto no ha sido encontrado');
  };

  const alreadyReviewed = product.reviews.find((r) => r.user.toString() === name.toString());

  if (alreadyReviewed) {
    res.status(400)
    throw new Error('Ya usted realizo una calificación')
  };

  const review = {
    name: name,
    rating: Number(rating),
    comment,
    user: req.user
  };

  product.reviews.push(review);

  product.numReviews = product.reviews.length;

  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();
  res.status(201).json({ message: 'La calificación ha sido agregada' });
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
})

// @desc    Get products by category
// @route   GET /api/products/category
// @access  Public
const getProductByCategory = asyncHandler(async (req, res) => {
  const categories = req.body.categories;
  const products = await Product.find({ 'category': { $in: categories } });

  res.json(products);
})

export {
  getProducts,
  getProductById,
  getProductByCategory,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
}
