import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";

import cors from "cors";
//config env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middleware
app.use(cors({ origin: "https://apkabazzar.netlify.app" }));
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
//rest api
app.get("/", (req, res) => {
  res.send("<h3>Wellcome to Apka Bazzar!</h3>");
});

//Port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgBlue);
});
