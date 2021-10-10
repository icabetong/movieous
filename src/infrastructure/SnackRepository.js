import { setDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../index";

export const create = async (snack) => {
    return await setDoc(doc(firestore, "snacks", snack.snackId), snack);
}

export const update = async (snack) => {
    return await updateDoc(doc(firestore, "snacks", snack.snackId), snack);
}

export const remove = async (snack) => {
    return await deleteDoc(doc(firestore, "snacks", snack.snackId));
}

export const transform = (snapshot) => {
    let docs = [];
    snapshot.forEach((doc) => docs.push(doc.data()));

    return docs;
}