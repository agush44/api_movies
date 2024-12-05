import Product from "../models/productModel.js";

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getProductById(id);
    if (!product) res.status(400).json({ error: "product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const addProduct = async (req, res) => {
  const { name, description, stock, price } = req.body;
  try {
    if (!name || !description || !stock || !price) {
      return res.status(400).json({
        status: 400,
        error: "All fields (name, description, stock, price) are required.",
      });
    }

    if (Number(stock) < 0 || Number(price) < 0) {
      return res.status(400).json({
        status: 400,
        error: "Stock and price must be non-negative numbers.",
      });
    }

    const newProduct = await Product.addProduct({
      name,
      description,
      stock: Number(stock),
      price: Number(price),
    });

    if (!newProduct) {
      return res.status(404).json({
        status: 404,
        error: "Failed to create product. Please try again.",
      });
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, stock, price } = req.body;

    const product = await Product.updateProduct(id);
    if (!product) {
      return res.status(404).json({
        status: 404,
        error: "Product not found.",
      });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.stock = stock || product.stock;
    product.price = price || product.price;

    await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Product ID is required." });
    }

    const product = Product.deleteProduct(id);

    if (!product) res.status(404).json({ error: "Product not found." });

    res.json({ message: "Product successfully deleted." });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

export {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
