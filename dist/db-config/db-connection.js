"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Log your env variables (optional)
console.log("DB Config:");
console.log("PGUSER:", process.env.PGUSER);
console.log("PGPASSWORD:", process.env.PGPASSWORD);
console.log("PGDATABASE:", process.env.PGDATABASE);
console.log("PGHOST:", process.env.PGHOST);
console.log("PGPORT:", process.env.PGPORT);
// Create the Sequelize instance
const sequelize = new sequelize_1.Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: process.env.PGHOST,
    dialect: "postgres",
    port: parseInt(process.env.PGPORT, 10),
    ssl: true,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false, // set true if you want SQL logs
});
exports.default = sequelize;
