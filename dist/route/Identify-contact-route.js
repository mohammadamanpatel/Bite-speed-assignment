"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Intentify_contact_1 = require("../controllers/Intentify-contact");
const router = express_1.default.Router();
router.post("/", async (req, res) => {
    await (0, Intentify_contact_1.identifyContact)(req, res);
});
exports.default = router;
