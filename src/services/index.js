import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get,child } from "firebase/database";
import { Globalurl } from "../Globals/globals";

export function getClients() {
    const arrayClientes = []
    const dbRef = ref(getDatabase());
    get(child(dbRef, `clientes/`)).then((snapshot) => {
     
    }).catch((error) => {
      console.error(error);
    });

}

export function sendMessageAll(body) {
  fetch(Globalurl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Define que o conteúdo do corpo é JSON
       'Client-Token': 'F8fb573818c8a48c48397e42afa579584S'
    },
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(result => console.log('Success:', result))
    .catch(error => console.error('Error:', error));
}