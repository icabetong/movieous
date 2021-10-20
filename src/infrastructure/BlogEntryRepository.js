import axios from "axios";
import { ref, uploadBytes, deleteObject, getDownloadURL } from "firebase/storage";
import { doc, setDoc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { firestore, storage } from "../index";

export const create = async (entry, content) => {
    const data = {
        ...entry,
        timestamp: serverTimestamp()
    }

    await setDoc(doc(firestore, "entries", entry.entryId), data)
    return await uploadBytes(ref(storage, `entries/${entry.entryId}.md`), content);
}

export const update = async (entry, content) => {
    await updateDoc(doc(firestore, "entries", entry.entryId), entry)
    return await uploadBytes(ref(storage, `entries/${entry.entryId}.md`), content)
}

export const remove = async (entry) => {
    await deleteDoc(doc(firestore, "entries", entry.entryId));
    return await deleteObject(ref(storage, `entries/${entry.entryId}.md`))
}

export const download = async (entry) => {
    let url = await getDownloadURL(ref(storage, `entries/${entry.entryId}.md`));
    let response = await axios({
        url: url,
        method: 'GET',
        responseType: "blob"
    })

    let file = new Blob([response.data], { type: "text/markdown" })
    return await file.text()
}

export const transform = (snapshot) => {
    let docs = [];
    snapshot.forEach((doc) => docs.push(doc.data()));

    return docs;
}