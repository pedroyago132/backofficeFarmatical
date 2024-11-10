import firebase from "firebase/compat/app";
import { getDatabase, ref, set } from "firebase/database";

export function setNewClient(encodePhone,wppInput,nomeInput,cpfInput,remedioInput,receita,usoContinuo) {
    
    firebase.database().ref(`clientes/${encodePhone}`).set({
        nome: nomeInput,
        whatsapp: wppInput,
        remédio: remedioInput,
        cpf:cpfInput,
        receita:receita,
        usoContinuo:usoContinuo
    })

  }