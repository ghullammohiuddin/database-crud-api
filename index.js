  import * as dotenv from "dotenv";
  dotenv.config();

  import dns from "dns";
  import express from "express";
  import mongoose from "mongoose";
  import userRoutes from "./src/routes/user.route.js";

  // System DNS often blocks SRV lookups needed by mongodb+srv://
  dns.setServers(["8.8.8.8", "8.8.4.4"]);

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", userRoutes);

  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected");
      app.listen(3000, () => console.log("Server running on port 3000"));
    })
    .catch((err) => console.log(err));
