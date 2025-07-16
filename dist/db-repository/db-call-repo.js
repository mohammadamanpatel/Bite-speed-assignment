"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllLinkedContacts = exports.updateContactLinkage = exports.createContact = exports.findContactsByEmailOrPhone = void 0;
const sequelize_1 = require("sequelize");
const contact_model_1 = require("../models/contact-model");
// Get all contacts that match email or phoneNumber
const findContactsByEmailOrPhone = async (email, phoneNumber) => {
    return contact_model_1.Contact.findAll({
        where: {
            [sequelize_1.Op.or]: [email ? { email } : {}, phoneNumber ? { phoneNumber } : {}],
        },
    });
};
exports.findContactsByEmailOrPhone = findContactsByEmailOrPhone;
// Create a new contact
const createContact = async ({ email, phoneNumber, linkPrecedence, linkedId, }) => {
    return contact_model_1.Contact.create({
        email: email || "",
        phoneNumber: phoneNumber || "",
        linkPrecedence,
        linkedId: linkedId || null,
    });
};
exports.createContact = createContact;
// Update contact (linkPrecedence + linkedId)
const updateContactLinkage = async (contactId, primaryId) => {
    await contact_model_1.Contact.update({
        linkPrecedence: "secondary",
        linkedId: primaryId,
    }, {
        where: { id: contactId },
    });
    // Update any contacts linked to this secondary one to now point to the true primary
    await contact_model_1.Contact.update({ linkedId: primaryId }, {
        where: { linkedId: contactId },
    });
};
exports.updateContactLinkage = updateContactLinkage;
// Find contacts linked to a specific primary ID
const findAllLinkedContacts = async (primaryId) => {
    return contact_model_1.Contact.findAll({
        where: {
            [sequelize_1.Op.or]: [{ id: primaryId }, { linkedId: primaryId }],
        },
    });
};
exports.findAllLinkedContacts = findAllLinkedContacts;
