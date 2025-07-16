import {
  createContact,
  findAllLinkedContacts,
  findContactsByEmailOrPhone,
  updateContactLinkage,
} from "../db-repository/db-call-repo";

// we are handling contact identification here
// using separate db-repository functions to keep code clean and modular

export const processContactIdentification = async (
  phoneNumber?: string,
  email?: string
) => {
  // step 1: find contacts that match given email or phone number
  const matchedContacts = await findContactsByEmailOrPhone(email, phoneNumber);

  // step 2: if no matching contact is found, create a new primary contact
  if (matchedContacts.length === 0) {
    const newContact = await createContact({
      email,
      phoneNumber,
      linkPrecedence: "primary",
    });

    // return new contact as response
    return {
      primaryContactId: newContact.id,
      emails: [newContact.email],
      phoneNumbers: [newContact.phoneNumber],
      secondaryContactIds: [],
    };
  }

  // step 3: filter all primary contacts from matched list
  let primaryContacts = matchedContacts.filter(
    (contact) =>
      contact.linkPrecedence === "primary" || contact.linkedId === null
  );

  // step 4: from primary contacts, find the oldest one (based on createdAt)
  let oldestPrimary = primaryContacts[0];
  for (const contact of primaryContacts) {
    if (contact.createdAt < oldestPrimary.createdAt) {
      oldestPrimary = contact;
    }
  }

  // step 5: make all other primary contacts secondary and link them to oldestPrimary
  for (const contact of primaryContacts) {
    if (contact.id !== oldestPrimary.id) {
      await updateContactLinkage(contact.id, oldestPrimary.id);
    }
  }

  // step 6: check if email + phoneNumber combination already exists exactly
  const exactMatch = matchedContacts.find(
    (contact) => contact.email === email && contact.phoneNumber === phoneNumber
  );

  // step 7: if this combination doesn’t exist, create new secondary contact
  if (!exactMatch) {
    await createContact({
      email,
      phoneNumber,
      linkPrecedence: "secondary",
      linkedId: oldestPrimary.id,
    });
  }

  // step 8: fetch all contacts linked to oldest primary
  const allLinkedContacts = await findAllLinkedContacts(oldestPrimary.id);

  // step 9: get unique emails, phone numbers, and secondary contact ids
  const emails = Array.from(
    new Set(allLinkedContacts.map((contact) => contact.email).filter(Boolean))
  );

  const phoneNumbers = Array.from(
    new Set(
      allLinkedContacts.map((contact) => contact.phoneNumber).filter(Boolean)
    )
  );

  const secondaryContactIds = allLinkedContacts
    .filter((contact) => contact.linkPrecedence === "secondary")
    .map((contact) => contact.id);

  // step 10: send final output
  return {
    primaryContactId: oldestPrimary.id,
    emails,
    phoneNumbers,
    secondaryContactIds,
  };
};
