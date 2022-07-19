import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { updatePassword } from "firebase/auth";

import { auth, db } from "./config";
export async function addTodoDB(data) {
    const todosRef = collection(db, "todos");
    try {
        const newDoc = await addDoc(todosRef, {
            ...data,
            uid: auth.currentUser.uid,
        });
        console.log("suc", newDoc);
    } catch (error) {
        console.log(error);
    }
}
export async function updateTodoDB(id, data) {
    const todoDoc = doc(db, "todos", id);
    await updateDoc(todoDoc, data);
}

export async function deleteDocDB(listIdDoc) {
    listIdDoc.forEach(async (id) => {
        const todoRef = doc(db, "todos", id);
        await deleteDoc(todoRef);
    });
}
export async function upDatePassWordDB(passNew) {
    await updatePassword(auth.currentUser, passNew);
}
