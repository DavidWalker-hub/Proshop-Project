import Express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import connectDB from "./config/db";

dotenv.config();

connectDB();

const app = Express();

app.use("/api/products", productRoutes);

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
