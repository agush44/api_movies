//Endpoints de recursos
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authToken } from "../middleware/authMiddleware.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", authToken, addProduct);
productRoutes.put("/:id", authToken, updateProduct);
productRoutes.delete("/:id", authToken, deleteProduct);

export { productRoutes };
