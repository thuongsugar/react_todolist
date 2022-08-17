import { Badge, Button, Collapse, Divider, Popconfirm } from "antd";
import { doc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppProvider";
import { auth, db } from "../../firebase/config";

const { Panel } = Collapse;

const Group = () => {
    const navigation = useNavigate();
    const { setIsAddGroupVisible, setSelectedGroupId, groups, groupsPending } =
        useContext(AppContext);
    const onChangeColap = (key) => {
        console.log(key);
    };
    const handleClickAddGroup = (e) => {
        auth.currentUser ? setIsAddGroupVisible(true) : navigation("/login");
    };

    const confirm = (gr) => {
        console.log(gr);
        const groupRef = doc(db, "groups", gr.id);
        setDoc(
            groupRef,
            {
                members: [...gr.members, auth.currentUser.uid],
                pending: [
                    ...gr.pending.filter((id) => id !== auth.currentUser.uid),
                ],
            },
            { merge: true }
        );
    };

    const cancel = async (grPending) => {
        const docGr = doc(db, "groups", grPending.id);
        await setDoc(
            docGr,
            {
                pending: [
                    ...grPending.pending.filter(
                        (memPending) => memPending !== auth.currentUser.uid
                    ),
                ],
            },
            { merge: true }
        );
    };
    return (
        <>
            <Collapse ghost defaultActiveKey={["1"]} onChange={onChangeColap}>
                <Panel header="List Group" key={1}>
                    {auth.currentUser && (
                        <div onClick={() => setSelectedGroupId("me")}>ME</div>
                    )}
                    <Divider
                        style={{
                            margin: "0",
                            marginBottom: "5px",
                            borderTopColor: "white",
                        }}
                    />
                    {groupsPending.map((grPending) => (
                        <Popconfirm
                            key={grPending.id}
                            title={
                                <span>
                                    Are you sure to join group{" "}
                                    <b>{grPending.nameGroup}</b> ?
                                </span>
                            }
                            onConfirm={() => confirm(grPending)}
                            onCancel={() => cancel(grPending)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <div>
                                <Badge className="ant-collapse-content-box" dot>
                                    <div>{grPending.nameGroup}</div>
                                </Badge>
                            </div>
                        </Popconfirm>
                    ))}
                    {groups.map((group) => (
                        <div
                            key={group.id}
                            onClick={() => setSelectedGroupId(group.id)}
                        >
                            {group.nameGroup}
                        </div>
                    ))}
                </Panel>
            </Collapse>
            <Button type="primary" onClick={handleClickAddGroup}>
                Create Group
            </Button>
        </>
    );
};

export default Group;
