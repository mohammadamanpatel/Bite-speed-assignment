"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_connection_1 = __importDefault(require("./db-config/db-connection"));
const Identify_contact_route_1 = __importDefault(require("./route/Identify-contact-route")); // ✅ Make sure this exports a Router
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.SERVER_PORT || 4000;
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/v1/identify", Identify_contact_route_1.default); // ✅ Mount the Router here
// DB & Server
db_connection_1.default
    .authenticate()
    .then(() => {
    console.log("✅ Connected to Neon Postgres!");
    return db_connection_1.default.sync({ alter: true });
})
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
})
    .catch((error) => {
    console.error("❌ Unable to start server:", error);
});
