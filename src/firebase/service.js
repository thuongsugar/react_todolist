import {
    collection,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    setDoc,
    getDoc,
    getDocs,
} from "firebase/firestore";
import { updateEmail, updatePassword, updateProfile } from "firebase/auth";

import { auth, db } from "./config";
import { async } from "@firebase/util";
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
const genericKeyName = (name) => {
    let res = [];
    const length = name.length;
    for (let i = 0; i < length; i++) {
        res.push(name.slice(0, i + 1));
    }
    return res;
};
export async function addUserDB(data) {
    const userRef = collection(db, "users");
    try {
        const newDoc = await addDoc(userRef, {
            ...data,
            keysName: genericKeyName(data.displayName),
        });
        console.log("suc", newDoc);
    } catch (error) {
        console.log(error);
    }
}
export async function getUserDB(uid) {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "==", uid));
    const user = await getDocs(q);
    console.log(user);
    let userRes = {};
    if (user.size === 1) {
        user.forEach((u) => {
            userRes = {
                ...u.data(),
                id: u.id,
            };
        });
    }
    return userRes;
}
export async function updateTodoDB(id, data) {
    const todoDoc = doc(db, "todos", id);
    await setDoc(todoDoc, { ...data }, { merge: true });
}

export async function deleteDocDB(listIdDoc) {
    listIdDoc.forEach(async (id) => {
        const todoRef = doc(db, "todos", id);
        await deleteDoc(todoRef);
    });
}
export async function updatePassWordDB(passNew) {
    await updatePassword(auth.currentUser, passNew);
}
export async function updateProfileDB(id, { displayName }) {
    //update
    const userDoc = doc(db, "users", id);
    await setDoc(
        userDoc,
        { displayName, keysName: genericKeyName(displayName) },
        { merge: true }
    );
    //get
    let userRes = {};

    const userCurrent = await getDoc(userDoc);
    console.log(userCurrent.data());
    if (userCurrent.exists()) {
        userRes = { ...userCurrent.data() };
        return userRes;
    }

    return userRes;
}
export async function updateEmailDB(id, email) {
    console.log(id);
    await updateEmail(auth.currentUser, email);
    return await setDoc(doc(db, "users", id), { email }, { merge: true });
}

export async function addGroupDB(nameGroup) {
    const groupRef = collection(db, "groups");
    try {
        const newDoc = await addDoc(groupRef, {
            nameGroup,
            members: [auth.currentUser.uid],
            pending: [],
            owner: auth.currentUser.uid,
        });
        console.log("suc", newDoc);
    } catch (error) {
        console.log(error);
    }
}

export async function updateMemberGroupDB(idGroup, members) {
    const groupDoc = doc(db, "groups", idGroup);
    await setDoc(groupDoc, { members: [...members] }, { merge: true });
}
