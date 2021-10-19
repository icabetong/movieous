import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { firestore, storage } from "../index";

export const create = async (entry, content) => {
    await setDoc(doc(firestore, "entries", entry.entryId), entry)
    return uploadBytes(ref(storage, `entries/${entry.entryId}.md`), content);
}