const fs = require('fs').promises;
const path = require('path');
const { nanoid } = require('nanoid')

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// TODO: returning table of contacts from "contacts.json" file

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath)
    const dataParsed = JSON.parse(data)
    console.table(dataParsed);
  } catch (error) {
    console.log(error.message);
  }
}

// TODO: returning contact with given id from "contacts.json" file

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath)
    const dataParsed = JSON.parse(data)
    const contact = dataParsed.find(({id}) => id === contactId) || null
    console.table(contact);
  } catch (error) {
    console.log(error.message);
  }
}

// TODO: deleting and returning deleted contact with given id from "contacts.json" file

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath)
    const dataParsed = JSON.parse(data)
    const contactIndex = dataParsed.find(({id}) => id === contactId) || null
    const newContactsArray = contactIndex ? dataParsed.splice(dataParsed.findIndex(({ id }) => id === contactId), 1) : null
    await fs.writeFile(contactsPath, JSON.stringify(dataParsed))
    console.table(newContactsArray);
  } catch (error) {
    console.log(error.message);
  }
}

// TODO: adding and returning added contact from "contacts.json" file

async function addContact(name, email, phone) {
  const id = nanoid()
  const newContact = {
    name,
    email,
    phone,
    id,
  }
  
  try {
    const data = await fs.readFile(contactsPath)
    const dataParsed = JSON.parse(data)
    dataParsed.push(newContact)
    await fs.writeFile(contactsPath, JSON.stringify(dataParsed))
    console.table(newContact);
  } catch (error) {
    console.log(error.message);
  }
}


module.exports = {
  listContacts,
  getContactById,
  removeContact, 
  addContact
};