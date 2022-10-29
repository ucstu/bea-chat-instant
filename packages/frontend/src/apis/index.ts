import { BeaApiClient } from "@bea-chat/api";

export const client = new BeaApiClient();

let { userLogin, userRegister, userSearch } = client.default;
let {
  addContacts,
  deleteContacts,
  updateContact,
  queryContacts,
  queryContact,
} = client.service;

userLogin = userLogin.bind(client.default);
userRegister = userRegister.bind(client.default);
userSearch = userSearch.bind(client.default);
addContacts = addContacts.bind(client.service);
deleteContacts = deleteContacts.bind(client.service);
updateContact = updateContact.bind(client.service);
queryContacts = queryContacts.bind(client.service);
queryContact = queryContact.bind(client.service);

export * from "@bea-chat/api";
export {
  userLogin,
  userRegister,
  userSearch,
  addContacts,
  deleteContacts,
  updateContact,
  queryContacts,
  queryContact,
};
