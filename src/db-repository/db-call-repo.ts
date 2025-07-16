import { Op } from "sequelize";
import { Contact } from "../models/contact-model";

// this function will find all contacts where either email or phone number matches
export const findContactsByEmailOrPhone = async (
  email?: string,
  phoneNumber?: string
) => {
  return Contact.findAll({
    where: {
      [Op.or]: [email ? { email } : {}, phoneNumber ? { phoneNumber } : {}],
    },
  });
};

// this function creates a new contact in the database
export const createContact = async ({
  email,
  phoneNumber,
  linkPrecedence,
  linkedId,
}: {
  email?: string;
  phoneNumber?: string;
  linkPrecedence: "primary" | "secondary";
  linkedId?: number | null;
}) => {
  return Contact.create({
    email: email || "",
    phoneNumber: phoneNumber || "",
    linkPrecedence,
    linkedId: linkedId || null,
  });
};

// this function updates a contact to make it a secondary contact
// and link it to the primary contact
export const updateContactLinkage = async (
  contactId: number,
  primaryId: number
) => {
  // change this contact to secondary and point it to primary
  await Contact.update(
    {
      linkPrecedence: "secondary",
      linkedId: primaryId,
    },
    {
      where: { id: contactId },
    }
  );

  // if any contact was already linked to this secondary contact,
  // now update them to point to the actual primary
  await Contact.update(
    { linkedId: primaryId },
    {
      where: { linkedId: contactId },
    }
  );
};

// this function gets all contacts that are linked to a primary contact
export const findAllLinkedContacts = async (primaryId: number) => {
  return Contact.findAll({
    where: {
      [Op.or]: [{ id: primaryId }, { linkedId: primaryId }],
    },
  });
};
