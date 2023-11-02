import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import replicateRoutes from "./routes/replicateRoutes.js";

dotenv.config();

const app = express();

const corsConfig = {
  origin: "https://https://img-e-forge.netlify.app/",
  credentials: true,
};
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));
app.use(express.json({ limit: "50mb" }));
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/replicate", replicateRoutes);

app.get("/", async (req, res) => {
  res.send("Hello into IMG-E-FORGE!");
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
