import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// Creating the Sequelize instance for sequlize methods and db connectivity
const sequelize = new Sequelize(
  process.env.PGDATABASE as string,
  process.env.PGUSER as string,
  process.env.PGPASSWORD as string,
  {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: parseInt(process.env.PGPORT as string, 10),
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false, // set true if you want SQL logs
  }
);

export default sequelize;
