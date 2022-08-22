import { SafetyCertificateOutlined } from "@ant-design/icons";
import { Modal, Space } from "antd";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import ControllerMember from "../group/ControllerMember";

function ShowMemberModel() {
    const { user } = useContext(AuthContext);
    const {
        isShowMemberVisible,
        setIsShowMemberVisible,
        selectedGroup,
        members,
    } = useContext(AppContext);
    console.log(members);
    const handleCancel = () => {
        setIsShowMemberVisible(false);
    };
    const handleOk = async () => {
        setIsShowMemberVisible(false);
    };
    return user ? (
        <Modal
            onCancel={handleCancel}
            footer={[]}
            onOk={handleOk}
            visible={isShowMemberVisible}
            title="Member Group"
        >
            {members.length > 0 &&
                members.map((mem) => {
                    console.log("vao");
                    return (
                        <div key={mem.id} style={{ marginBottom: "8px" }}>
                            {selectedGroup.owner === user.uid &&
                            selectedGroup.owner === mem.uid ? (
                                <p>
                                    <SafetyCertificateOutlined
                                        style={{ color: "#04d92f" }}
                                    />{" "}
                                    Me
                                </p>
                            ) : (
                                <ControllerMember member={mem} />
                            )}
                        </div>
                    );
                })}
        </Modal>
    ) : (
        <></>
    );
}

export default ShowMemberModel;
