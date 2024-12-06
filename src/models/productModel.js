import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Product = model("Product", productSchema);

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Error retrieving products from the database.");
  }
};

const getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found.");
    }
    return product;
  } catch (error) {
    throw new Error("Error retrieving product from the database.");
  }
};

const addProduct = async (dataProduct) => {
  try {
    const newProduct = new Product(dataProduct);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Error creating the product");
  }
};

const updateProduct = async (id, updateData) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found.");
    }
    Object.assign(product, updateData);
    await product.save();
    return product;
  } catch (error) {
    throw new Error("Error updating the product");
  }
};

const deleteProduct = async () => {
  try {
  } catch (error) {
    throw new Error("Error deleting the product");
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
