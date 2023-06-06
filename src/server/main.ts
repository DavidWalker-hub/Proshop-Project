import Express from "express";
import ViteExpress from "vite-express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRoutes";
import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

dotenv.config({ debug: true });
const PORT = process.env.PORT || 3000;

connectDB();

const app = Express();

// Body parser middleware
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// app.use(notFound);
app.use(errorHandler);

ViteExpress.listen(app, PORT as number, () =>
  console.log(
    `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}...`
  )
);
