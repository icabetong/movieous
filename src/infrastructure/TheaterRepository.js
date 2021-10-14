import { setDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../index";

export const create = async (theater) => {
    return await setDoc(doc(firestore, "theaters", theater.theaterId), theater);
}

export const update = async (theater) => {
    return await updateDoc(doc(firestore, "theaters", theater.theaterId), theater);
}

export const remove = async (theater) => {
    return await deleteDoc(doc(firestore, "theater", theater.theaterId));
}

export const transform = (snapshot) => {
    let docs = [];
    snapshot.forEach((doc) => docs.push(doc.data()));

    return docs;
}