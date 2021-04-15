import AsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// fetch all product

const getProducts = AsyncHandler(async (req, res) => {
  const pageSize = 4;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// fetch single product

const getProductById = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Delete a product

const deleteProduct = AsyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create a product

const createProduct = AsyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      brand,
      category,
      countInStock,
    } = req.body;

    const product = new Product({
      name,
      price,
      user: req.user._id,
      photo: req.file.location,
      brand,
      category,
      countInStock,
      description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {}
});

// Update a product

const updateProduct = AsyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    // console.log(image.substring(16));
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image.substring(16);
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Create new Review

const createReview = AsyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString(),
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Reviewed added' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// Get top rated Products

const getTopProducts = AsyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
};
