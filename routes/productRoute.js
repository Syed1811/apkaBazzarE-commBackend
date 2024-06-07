import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  getLatestProductController,
  getTopSaleProductsController,
  getAllLatestProductController,
  getSaleProductsController,
  getProductsByCategoryController,
  searchProductsController,
  getRandomProductsController,
  getGroceryFour,
  getSimilarFour,
  getProductsFromMultipleCategoriesController,
  getSingleProductControllerId,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//get products
router.get("/get-product", getProductController);

// top-4 new arivals
router.get("/latest-products", getLatestProductController);

//  all new arivals
router.get("/allLatest-products", getAllLatestProductController);

// top 4 hot on sales
router.get("/top-4-products", getTopSaleProductsController);

// all on sale products
router.get("/sale-products", getSaleProductsController);

//single product
router.get("/get-product/:slug", getSingleProductController);

// all product associated with certain category
router.get(
  "/products-by-category/:categorySlug",
  getProductsByCategoryController
);

//get photo
router.get("/product-photo/:pid", productPhotoController);

//delete rproduct
router.delete("/productDelete/:pid", deleteProductController);

// search product
router.get("/search/:query", searchProductsController);

// random product
router.get("/random-product", getRandomProductsController);

// routes
router.get("/grocery-four/:categorySlug", getGroceryFour);

// routes
router.get("/similar-four/:categorySlug", getSimilarFour);

// get item from multiple categories
router.get(
  "/multiple-categories/:categorySlugs",
  getProductsFromMultipleCategoriesController
);

// product by id
router.get("/product-by-id/:pid", getSingleProductControllerId);

export default router;
