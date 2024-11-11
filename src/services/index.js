import firebase from "firebase/compat/app";
import { getDatabase, ref, set, get,child } from "firebase/database";
import { setItem } from "../storage/serviceState";


export function getClients() {
    const arrayClientes = []
    const dbRef = ref(getDatabase());
    get(child(dbRef, `clientes/`)).then((snapshot) => {
     
    }).catch((error) => {
      console.error(error);
    });

}