import Express from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import Product from "../models/productModel";
import { ProductInterface } from "../../types/product";

// @desc Fetch all Products
// @route GET "/api/products"
// @access Public
export const getProducts = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const products: ProductInterface[] = await Product.find({});
    res.json(products);
  }
);

// @desc Fetch single Product
// @route GET "/api/products/:id"
// @access Public
export const getProductById = asyncHandler(
  async (req: Express.Request, res: Express.Response) => {
    const product: ProductInterface | null = await Product.findById(
      req.params.id
    );

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Resource not found");
    }
  }
);
