import productModel from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      brand,
      sales,
      colour,
      salePrice,
    } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !brand:
        return res.status(500).send({ error: "Brand is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      counTotal: products.length,
      message: "AllProducts ",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get prduct by id
export const getSingleProductControllerId = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.productId) // Assuming the parameter is named "productId"
      .select("-photo")
      .populate("category");
    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single product",
      error,
    });
  }
};

// top 4 latest product
export const getLatestProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(4) // Limit to the latest 4 products
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Latest 4 Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// all latest product
export const getAllLatestProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: "Latest 4 Products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error: error.message,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate producta
export const updateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      sales,
      salePrice,
      colour,
      brand,
    } = req.fields;
    const { photo } = req.files;
    //alidation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
      case !price:
        return res.status(500).send({ error: "Price is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is Required" });
      case !brand:
        return res.status(500).send({ error: "Brand is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "photo is Required and should be less then 1mb" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

// top on sale products
export const getTopSaleProductsController = async (req, res) => {
  try {
    const topSaleProducts = await productModel.aggregate([
      {
        $match: { sales: true }, // Filter for products on sale
      },
      {
        $project: {
          _id: 1,
          name: 1,
          brand: 1,
          price: 1,
          salePrice: 1,
          priceDifference: { $subtract: ["$price", "$salePrice"] }, // Calculate price difference
        },
      },
      {
        $sort: { priceDifference: -1 }, // Sort by descending order of price difference
      },
      {
        $limit: 4, // Limit the result to the top 4
      },
    ]);

    res.status(200).json({
      success: true,
      countTotal: topSaleProducts.length,
      message: "Top 4 Products with the Largest Price Difference",
      products: topSaleProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting top sale products",
      error: error.message,
    });
  }
};

// get all on sale products
export const getSaleProductsController = async (req, res) => {
  try {
    const saleProducts = await productModel
      .find({ sales: true })
      .select("-photo") // Exclude the 'photo' field for simplicity
      .sort({ createdAt: -1 }); // Sort by descending order of creation date (latest first)

    res.status(200).json({
      success: true,
      countTotal: saleProducts.length,
      message: "All Products on Sale",
      products: saleProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting sale products",
      error: error.message,
    });
  }
};

// all product associated with certain category

export const getProductsByCategoryController = async (req, res) => {
  try {
    // Get the category slug from the request parameters
    const { categorySlug } = req.params;

    // Find the category based on the slug
    const category = await categoryModel.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Find products associated with the category
    const products = await productModel
      .find({ category: category._id })
      .select("-photo") // Exclude the 'photo' field for simplicity
      .sort({ createdAt: -1 }); // Sort by descending order of creation date (latest first)

    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: `All Products in the ${category.name} category`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting products by category",
      error: error.message,
    });
  }
};

// search operation
export const searchProductsController = async (req, res) => {
  try {
    // Get the search query from the request parameters
    const { query } = req.params;

    // Create a regular expression for a case-insensitive search
    const regex = new RegExp(escapeRegex(query), "i");

    // Find products that match the search query in name or brand
    const products = await productModel
      .find({
        $or: [{ name: { $regex: regex } }, { brand: { $regex: regex } }],
      })
      .select("-photo") // Exclude the 'photo' field for simplicity
      .sort({ createdAt: -1 }); // Sort by descending order of creation date (latest first)

    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: `Search results for '${query}'`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in searching products",
      error: error.message,
    });
  }
};

// Function to escape special characters in the search query
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// randon product

export const getRandomProductsController = async (req, res) => {
  try {
    const randomProducts = await productModel.aggregate([
      { $sample: { size: 4 } }, // Select 4 random documents
    ]);

    res.status(200).json({
      success: true,
      countTotal: randomProducts.length,
      message: "Random 4 Products",
      products: randomProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting random products",
      error: error.message,
    });
  }
};

// category4Products

export const getGroceryFour = async (req, res) => {
  try {
    // Get the category slug from the request parameters
    const { categorySlug } = req.params;

    // Find the category based on the slug
    const category = await categoryModel.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Find products associated with the category
    const products = await productModel
      .find({ category: category._id })
      .select("-photo") // Exclude the 'photo' field for simplicity
      .sort({ createdAt: -1 }) // Sort by descending order of creation date (latest first)
      .limit(4);
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: `All Products in the ${category.name} category`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting products by category",
      error: error.message,
    });
  }
};

// getSimilarFour

export const getSimilarFour = async (req, res) => {
  try {
    // Get the category slug from the request parameters
    const { categorySlug } = req.params;

    // Find the category based on the slug
    const category = await categoryModel.findOne({ slug: categorySlug });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Find products associated with the category
    const products = await productModel
      .find({ category: category._id })
      .select("-photo") // Exclude the 'photo' field for simplicity
      .sort({ createdAt: -1 }) // Sort by descending order of creation date (latest first)
      .limit(4);
    res.status(200).json({
      success: true,
      countTotal: products.length,
      message: `All Products in the ${category.name} category`,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting products by category",
      error: error.message,
    });
  }
};

// Import necessary models and libraries

// Controller to get products from multiple categories
export const getProductsFromMultipleCategoriesController = async (req, res) => {
  try {
    // Extract category slugs from the request parameters
    const { categorySlugs } = req.params;

    // Convert comma-separated category slugs string to an array
    const categorySlugArray = categorySlugs.split("_");

    // Find categories based on the provided slugs
    const categories = await categoryModel.find({
      slug: { $in: categorySlugArray },
    });

    // Initialize an empty array to store products from all categories
    let allProducts = [];

    // Iterate through each category and find associated products
    for (const category of categories) {
      // Find products associated with the current category
      const products = await productModel.aggregate([
        { $match: { category: category._id } }, // Match products belonging to the current category
        { $sample: { size: 6 } }, // Select 6 random documents
        { $project: { photo: 0 } }, // Exclude the 'photo' field for simplicity
      ]);

      // Push products of the current category into the array
      allProducts = allProducts.concat(products);
    }

    // Send the merged array of products as the response
    res.status(200).json({
      success: true,
      countTotal: allProducts.length,
      message: `Products from Categories: ${categorySlugArray.join(", ")}`,
      products: allProducts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error in getting products from multiple categories",
      error: error.message,
    });
  }
};
