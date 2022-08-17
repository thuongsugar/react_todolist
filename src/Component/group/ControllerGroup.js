import {
    DeleteOutlined,
    QuestionOutlined,
    TeamOutlined,
    UserAddOutlined,
} from "@ant-design/icons";
import { async } from "@firebase/util";
import { Popconfirm, Space } from "antd";
import { deleteDoc, doc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import handleError from "../../error/handleError";
import { auth, db } from "../../firebase/config";

function ControllerGroup() {
    const {
        setIsShowMemberVisible,
        setIsInviteMemberVisible,
        selectedGroup,
        setIsRenameGr,
    } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function onCancel(e) {
        setIsVisible(false);
        setIsLoading(false);
    }
    async function onConfirm(e) {
        setIsLoading(true);
        //delete gr
        if (auth.currentUser.uid === selectedGroup.owner) {
            const docGroup = doc(db, "groups", selectedGroup.id);
            await deleteDoc(docGroup);
            handleError("success");
        }
        setIsVisible(false);
        setIsLoading(false);
    }
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                color: "#333",
                cursor: "pointer",
            }}
        >
            <Space onClick={() => setIsInviteMemberVisible(true)}>
                <p>
                    <UserAddOutlined style={{ marginRight: "2px" }} /> Invite
                    member
                </p>
            </Space>
            <Space onClick={() => setIsShowMemberVisible(true)}>
                <p>
                    <TeamOutlined style={{ marginRight: "2px" }} />
                    Member
                </p>
            </Space>
            <Space onClick={() => setIsRenameGr(true)}>
                <p>
                    <TeamOutlined style={{ marginRight: "2px" }} />
                    Rename Group
                </p>
            </Space>
            {selectedGroup.owner === auth.currentUser.uid ? (
                <Popconfirm
                    visible={isVisible}
                    title={<p>You want delete this group?</p>}
                    onCancel={onCancel}
                    onConfirm={onConfirm}
                    okText={"Yes"}
                    okButtonProps={{
                        ghost: true,
                        danger: true,
                        loading: isLoading,
                    }}
                    icon={<QuestionOutlined style={{ color: "red" }} />}
                    cancelText={"NO"}
                    placement={"left"}
                    // color={"#DC3545"}
                >
                    <Space onClick={() => setIsVisible(true)}>
                        <p style={{ color: "red" }}>
                            <DeleteOutlined style={{ marginRight: "2px" }} />
                            Delete Group
                        </p>
                    </Space>
                </Popconfirm>
            ) : (
                <></>
            )}
        </div>
    );
}

export default ControllerGroup;
