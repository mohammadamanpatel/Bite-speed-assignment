"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyContact = void 0;
const contact_service_1 = require("../services/contact-service");
const identifyContact = async (req, res) => {
    try {
        const { phoneNumber, email } = req.body;
        // Validation: Require at least one of phoneNumber or email
        if (!phoneNumber && !email) {
            return res
                .status(400)
                .json({ message: "Please provide phoneNumber or email" });
        }
        const result = await (0, contact_service_1.processContactIdentification)(phoneNumber, email);
        return res.status(200).json({ contact: result });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
exports.identifyContact = identifyContact;
