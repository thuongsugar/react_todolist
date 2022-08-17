import { Avatar, Form, Modal, Select, Spin } from "antd";
import {
    collection,
    doc,
    getDocs,
    query,
    setDoc,
    where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import handleError from "../../error/handleError";
import { db } from "../../firebase/config";
const { Option } = Select;

function debounce(fetchUserCB, delay, member, memberPending) {
    delay = delay || 0;
    let timeId;
    return (search) => {
        if (timeId) {
            console.log("clear");
            clearTimeout(timeId);
            timeId = null;
        }

        timeId = setTimeout(() => {
            fetchUserCB(search, member, memberPending);
            // clearTimeout(timeId);
        }, delay);
    };
}

function InviteMemberModel() {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const [values, setValues] = useState([]);
    const [form] = Form.useForm();
    const { isInviteMemberVisible, setIsInviteMemberVisible, selectedGroup } =
        useContext(AppContext);

    useEffect(() => () => setOptions([]), []);

    function handleCancel() {
        setValues([]);
        setOptions([]);
        setIsInviteMemberVisible(false);
    }

    async function fetchUser(search, currentMember, memberPending) {
        console.log(search);
        setOptions([]);
        setFetching(true);
        const userRef = collection(db, "users");
        const q = query(
            userRef,
            where("keysName", "array-contains", search.toLowerCase())
        );
        const userData = await getDocs(q);

        const userFetch = userData.docs
            .map((user) => ({
                ...user.data(),
                id: user.id,
            }))
            .filter((u) => !currentMember.includes(u.uid));

        setOptions(
            userFetch.map((u) => ({
                ...u,
                isPending: memberPending.includes(u.uid) ? true : false,
            }))
        );
        setFetching(false);
    }

    async function handleOk() {
        console.log(values);
        if (values.length > 0) {
            //update groups
            const docGroup = doc(db, "groups", selectedGroup.id);
            await setDoc(
                docGroup,
                // { members: [...selectedGroup.members, ] },
                { pending: [...selectedGroup.pending, ...values] },
                { merge: true }
            );
            handleError("success");
            setValues([]);
            setOptions([]);
        }
    }
    function onChangeSelect(e) {
        setValues(e);
    }
    function onSearchSelect() {
        return debounce(
            fetchUser,
            1000,
            selectedGroup.members,
            selectedGroup.pending
        );
        // await fetchUser(value, selectedGroup.members);
    }
    return (
        <Modal
            onCancel={handleCancel}
            onOk={handleOk}
            visible={isInviteMemberVisible}
            title={"Invite member"}
        >
            <Select
                mode="multiple"
                onChange={onChangeSelect}
                onSearch={onSearchSelect()}
                notFoundContent={fetching ? <Spin size="small" /> : null}
                placeholder={"Input name"}
                value={values}
                filterOption={false}
                style={{ width: "100%" }}
            >
                {options.map((option) => (
                    <Option
                        disabled={option.isPending ? true : false}
                        // value={option.uid}
                        key={option.uid}
                        title={option.displayName}
                    >
                        <Avatar size={"small"} style={{ marginRight: "4px" }}>
                            {option.displayName.charAt(0).toUpperCase()}
                        </Avatar>
                        <span>
                            {option.displayName}{" "}
                            {option.isPending ? "(Pending)" : ""}
                        </span>
                    </Option>
                ))}
            </Select>
        </Modal>
    );
}

export default InviteMemberModel;
