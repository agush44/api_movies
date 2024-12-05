import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
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

const Product = mongoose.model("product", productSchema);

const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error("Error al obtener los productos");
  }
};

const getProductById = async () => {
  try {
  } catch (error) {}
};

const addProduct = async (dataProduct) => {
  try {
    const newProduct = new Product(dataProduct);
    await newProduct.save();
    return newProduct;
  } catch (error) {
    throw new Error("Error al crear el producto");
  }
};

const updateProduct = async () => {
  try {
  } catch (error) {}
};

const deleteProduct = async () => {
  try {
  } catch (error) {}
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
