import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProductById,
  getProductById,
  getProducts,
  updateProductAvailable,
} from "./handlers/products";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductById
);

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("El valor debe ser un numero")
    .custom((value) => value > 0)
    .withMessage("El valor debe ser mayor a cero")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio"),

  handleInputErrors,

  createProduct
);

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede ir vacio"),

  body("price")
    .isNumeric()
    .withMessage("El valor debe ser un numero")
    .custom((value) => value > 0)
    .withMessage("El valor debe ser mayor a cero")
    .notEmpty()
    .withMessage("El precio del producto no puede ir vacio"),
  body("available")
    .isBoolean()
    .withMessage("Error al marcar la disponibilidad"),
  handleInputErrors,
  editProductById
);

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  updateProductAvailable
);

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
