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

/**
 * @swagger
 * components:
 *    schemas:
 *        Delete:
 *            type: string
 *            example: "Producto eliminado"
 *        Product:
 *            type: object
 *            properties:
 *                id:
 *                    type: integer
 *                    description: The product ID
 *                    example: 1
 *                name:
 *                    type: string
 *                    description: The product name
 *                    example: Monitor
 *                price:
 *                    type: number
 *                    description: The product price
 *                    example: 100
 *                available:
 *                    type: boolean
 *                    description: The product availability
 *                    example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Get a list of products
 *        tags:
 *            - Products
 *        responses:
 *            200: 
 *                description: succesfull response
 *                content:
 *                    aplication/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Get a product by id
 *        tags:
 *            - Products
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *        responses:
 *            200: 
 *                description: Succesfull response
 *                content:
 *                    aplication/json:
 *                        schema:
 *                             $ref: '#components/schemas/Product'
 *            404: 
 *                description: Not Found
 *            400: 
 *                description: Bad request
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  getProductById
);


/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *      responses:
 *          201:
 *              description: Successful response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - invalid input data
 * 
 */


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

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *        summary: Update a product by id
 *        tags:
 *            - Products
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "Monitor Curvo 49 Pulgadas"
 *                            price:
 *                                type: number
 *                                example: 399
 *                            available:
 *                                type: boolean
 *                                example: true
 *        responses:
 *            200: 
 *                description: Succesfull update
 *                content:
 *                    aplication/json:
 *                        schema:
 *                             $ref: '#components/schemas/Product'
 *            404: 
 *                description: Not Found
 *            400: 
 *                description: Bad request
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *        summary: Update availability for a product
 *        tags:
 *            - Products
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *        responses:
 *            200: 
 *                description: Succesfull update
 *                content:
 *                    aplication/json:
 *                        schema:
 *                             $ref: '#components/schemas/Product'
 *            404: 
 *                description: Not Found
 *            400: 
 *                description: Bad request
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  updateProductAvailable
);

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *        summary: Delete a product
 *        tags:
 *            - Products
 *        parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *        responses:
 *            200: 
 *                description: Succesfull delete
 *                content:
 *                    aplication/json:
 *                        schema:
 *                             $ref: '#components/schemas/Delete'
 *            404: 
 *                description: Not Found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no valido"),
  handleInputErrors,
  deleteProduct
);

export default router;
