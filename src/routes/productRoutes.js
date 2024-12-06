//Endpoints de recursos
import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { auth } from "../middleware/authMiddleware.js";

const productRoutes = Router();

productRoutes.get("/", auth, getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", addProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export { productRoutes };
