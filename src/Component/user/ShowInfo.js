import { EditOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { Button, Modal, Form, Input, Descriptions } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { updatePassWordDB } from "../../firebase/service";
import handleError from "../../error/handleError";
import { AuthContext } from "../../Context/AuthProvider";
function ShowInfo() {
    const { user } = useContext(AuthContext);
    console.log(user);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(true);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log(values);
        const newPass = values.newPass.trim();
        try {
            await updatePassWordDB(newPass);
            handleError("success");
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.log(error);
            handleError(error.code);
            form.getFieldInstance("newPass").focus();
        }
    };
    useEffect(() => {
        if (!user) {
            console.log("noo user");
        }
    }, [user]);
    useEffect(() => {
        if (!isModalVisible) {
            navigate("/");
        }
    }, [isModalVisible]);

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        console.log("cancel");
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            <Modal
                title="Info"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <Descriptions>
                    <Descriptions.Item label="Display Name" span={3}>
                        {user ? (
                            <>
                                {user.userName}
                                <Link to={"edit-display-name"}>
                                    <EditOutlined />
                                </Link>
                            </>
                        ) : (
                            ""
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>
                        <>
                            {user ? (
                                <>
                                    {user.email} <Link to="edit-email" />
                                    <Link to="edit-email">
                                        <EditOutlined />
                                    </Link>
                                </>
                            ) : (
                                ""
                            )}
                        </>
                    </Descriptions.Item>
                    <Descriptions.Item>
                        <Outlet />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}

export default ShowInfo;
