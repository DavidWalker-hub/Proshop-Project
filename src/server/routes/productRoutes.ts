import Express from "express";
// import { Send, Query } from "express-serve-static-core";
import Product from "../models/productModel";
import mongoose from "mongoose";
import { asyncHandler } from "../middleware/asyncHandler";

const router = Express.Router();

// export interface TypedRequestBody<T> extends Express.Request {
//   body: T;
// }

// export interface TypedRequestQuery<T extends Query> extends Express.Request {
//   query: T;
// }

// export interface TypedRequest<T extends Query, U> extends Express.Request {
//   body: U;
//   query: T;
// }

// export interface TypedResponse<ResBody> extends Express.Response {
//   json: Send<ResBody, this>;
// }

// @desc Fetch all Products
// @route GET "/api/products"
// @access Public
router.get(
  "/",
  asyncHandler(async (_req: Express.Request, res: Express.Response) => {
    const products = await Product.find({});
    console.log("Request made to /api/products");
    res.json(products);
  })
);

// @desc Fetch single Products
// @route GET "/api/products/:id"
// @access Public
router.get(
  "/:id",
  asyncHandler(async (req: Express.Request, res: Express.Response) => {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const product = await Product.findById(req.params.id);

      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
