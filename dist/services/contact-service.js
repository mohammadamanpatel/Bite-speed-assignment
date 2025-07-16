"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processContactIdentification = void 0;
const db_call_repo_1 = require("../db-repository/db-call-repo");
const processContactIdentification = async (phoneNumber, email) => {
    const matchedContacts = await (0, db_call_repo_1.findContactsByEmailOrPhone)(email, phoneNumber);
    if (matchedContacts.length === 0) {
        const newContact = await (0, db_call_repo_1.createContact)({
            email,
            phoneNumber,
            linkPrecedence: "primary",
        });
        return {
            primaryContactId: newContact.id,
            emails: [newContact.email],
            phoneNumbers: [newContact.phoneNumber],
            secondaryContactIds: [],
        };
    }
    let primaryContacts = matchedContacts.filter((contact) => contact.linkPrecedence === "primary" || contact.linkedId === null);
    let oldestPrimary = primaryContacts[0];
    for (const contact of primaryContacts) {
        if (contact.createdAt < oldestPrimary.createdAt) {
            oldestPrimary = contact;
        }
    }
    for (const contact of primaryContacts) {
        if (contact.id !== oldestPrimary.id) {
            await (0, db_call_repo_1.updateContactLinkage)(contact.id, oldestPrimary.id);
        }
    }
    const exactMatch = matchedContacts.find((contact) => contact.email === email && contact.phoneNumber === phoneNumber);
    if (!exactMatch) {
        await (0, db_call_repo_1.createContact)({
            email,
            phoneNumber,
            linkPrecedence: "secondary",
            linkedId: oldestPrimary.id,
        });
    }
    const allLinkedContacts = await (0, db_call_repo_1.findAllLinkedContacts)(oldestPrimary.id);
    const emails = Array.from(new Set(allLinkedContacts.map((contact) => contact.email).filter(Boolean)));
    const phoneNumbers = Array.from(new Set(allLinkedContacts.map((contact) => contact.phoneNumber).filter(Boolean)));
    const secondaryContactIds = allLinkedContacts
        .filter((contact) => contact.linkPrecedence === "secondary")
        .map((contact) => contact.id);
    return {
        primaryContactId: oldestPrimary.id,
        emails,
        phoneNumbers,
        secondaryContactIds,
    };
};
exports.processContactIdentification = processContactIdentification;
