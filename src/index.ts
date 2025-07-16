import express from "express";
import dotenv from "dotenv";
import sequelize from "./db-config/db-connection";
import contactRoutes from "./route/Identify-contact-route"; // ✅ Make sure this exports a Router

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Using express.json() inbuild Middleware to parse the json body
app.use(express.json());

// accessing contactroute with /api/v1/identify path
app.use("/api/v1/identify", contactRoutes);

//connecting to db using sequelize
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connected to Neon Postgres!");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Unable to start server:", error);
  });
