import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "../firebase/config";
import { AuthContext } from "./AuthProvider";

const AppContext = createContext();
function AppProvider({ children }) {
    const { user } = useContext(AuthContext);
    const [isAddGroupVisible, setIsAddGroupVisible] = useState(false);
    const [isRenameGr, setIsRenameGr] = useState(false);
    const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
    const [isShowMemberVisible, setIsShowMemberVisible] = useState(false);

    const [groups, setGroups] = useState([]);
    const [groupsPending, setGroupsPending] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState("");
    const [members, setMembers] = useState([]);
    useEffect(() => {
        if (user) {
            const groupsRef = collection(db, "groups");
            const q = query(
                groupsRef,
                where("pending", "array-contains", auth.currentUser.uid)
            );
            const unsubscribed = onSnapshot(q, (snap) => {
                const groupsPending = snap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(groupsPending);
                setGroupsPending([...groupsPending]);
            });
            return () => unsubscribed();
        }
    }, [user]);
    useEffect(() => {
        if (user) {
            setSelectedGroupId(user.uid);
            const groupsRef = collection(db, "groups");
            const q = query(
                groupsRef,
                where("members", "array-contains", auth.currentUser.uid)
                // orderBy("createdAt")
            );
            const unsubscribed = onSnapshot(q, (snap) => {
                const groups = snap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(groups);
                setGroups([...groups]);
            });
            return () => unsubscribed();
        } else {
            setGroups([]);
        }
    }, [user]);

    const selectedGroup = useMemo(() => {
        const selectedGr = groups.find((group) => {
            return group.id === selectedGroupId;
        });
        if (!selectedGr) {
            setSelectedGroupId(user?.uid);
            return {};
        }
        return selectedGr;
    }, [selectedGroupId, groups, user]);
    useEffect(() => {
        if (user && selectedGroupId !== user.uid) {
            const membersRef = collection(db, "users");
            const q = query(
                membersRef,
                where("uid", "in", selectedGroup.members)
            );
            const unsubscribed = onSnapshot(q, (snap) => {
                const members = snap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(members);
                setMembers(members);
            });
            return () => unsubscribed();
        } else {
            setMembers([]);
        }
    }, [selectedGroup.members, user, selectedGroupId]);

    return (
        <AppContext.Provider
            value={{
                isInviteMemberVisible,
                setIsInviteMemberVisible,
                isAddGroupVisible,
                setIsAddGroupVisible,
                isRenameGr,
                setIsRenameGr,
                groups,
                groupsPending,
                selectedGroup,
                setSelectedGroupId,
                selectedGroupId,
                members,
                isShowMemberVisible,
                setIsShowMemberVisible,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export { AppContext };
export default AppProvider;
