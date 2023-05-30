import Express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import connectDB from "./config/db";

dotenv.config({ debug: true });
const PORT = process.env.PORT || 3000;

connectDB();

const app = Express();

app.use("/api/products", productRoutes);

// app.get("/hello", (_, res) => {
//   res.send(PORT);
// });

ViteExpress.listen(app, PORT as number, () =>
  console.log(
    `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
