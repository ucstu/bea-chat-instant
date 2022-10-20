import { BeaApiClient } from "@bea-chat/api";

export const client = new BeaApiClient();

let { postLogin, postRegister } = client.default;
let { deleteContacts, getContacts, getContacts1, postContacts, putContacts } =
  client.service;

postLogin = postLogin.bind(client.default);
postRegister = postRegister.bind(client.default);
deleteContacts = deleteContacts.bind(client.service);
getContacts = getContacts.bind(client.service);
getContacts1 = getContacts1.bind(client.service);
postContacts = postContacts.bind(client.service);
putContacts = putContacts.bind(client.service);

export * from "@bea-chat/api";
export {
  postLogin,
  postRegister,
  deleteContacts,
  getContacts,
  getContacts1,
  postContacts,
  putContacts,
};
