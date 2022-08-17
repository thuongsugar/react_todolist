import { MoreOutlined } from "@ant-design/icons";
import { Avatar, Popover, Space } from "antd";
import { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import handleError from "../../error/handleError";
import { updateMemberGroupDB } from "../../firebase/service";

function ControllerMember({ member }) {
    const { selectedGroup, setIsShowMemberVisible } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);

    async function handleClickDeleteMember(uidDelete) {
        console.log(uidDelete);
        console.log(selectedGroup.members);
        const membersFilter = selectedGroup.members.filter((uid) => {
            return uid !== uidDelete;
        });
        console.log(membersFilter);
        await updateMemberGroupDB(selectedGroup.id, membersFilter);
        handleError("success");
    }

    return (
        <Space
            style={{
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <span>
                <Avatar
                    style={{
                        background: `#${Math.floor(
                            Math.random() * 16777215
                        ).toString(16)}`,
                    }}
                    size={"small"}
                >
                    {member?.displayName.charAt(0).toUpperCase()}
                </Avatar>{" "}
                {member.displayName}
                {member.uid === user.uid ? " (me)" : ""}
            </span>
            {selectedGroup.owner === user.uid ? (
                <Popover
                    content={
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleClickDeleteMember(member.uid)}
                        >
                            Delete
                        </span>
                    }
                    placement={"right"}
                    trigger={"click"}
                >
                    <MoreOutlined style={{ cursor: "pointer" }} />
                </Popover>
            ) : member.uid === user.uid ? (
                <Popover
                    trigger={"click"}
                    // visible={isVisible}
                    content={
                        <span
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                handleClickDeleteMember(member.uid);
                                setIsShowMemberVisible(false);
                                // setIsVisible(false);
                            }}
                        >
                            Leave
                        </span>
                    }
                    placement={"right"}
                >
                    <MoreOutlined
                        // onClick={() => setIsVisible(true)}
                        style={{ cursor: "pointer" }}
                    />
                </Popover>
            ) : (
                <></>
            )}
        </Space>
    );
}

export default ControllerMember;
