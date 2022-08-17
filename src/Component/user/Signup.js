import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useState, useEffect, useContext } from "react";
import { Button, Modal, Form, Input } from "antd";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import handleError from "../../error/handleError";
import { addUserDB, updateProfileDB } from "../../firebase/service";
import { useNavigate } from "react-router-dom";

function Signin() {
    const userAuth = useContext(AuthContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
    const [isModalVisible, setIsModalVisible] = useState(true);
    useEffect(() => {
        if (userAuth.user) {
            console.log("vao");
            navigate("..");
        }
    }, [userAuth.user]);
    useEffect(() => {
        if (!isModalVisible) {
            navigate("..");
        }
    }, [isModalVisible]);

    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values) => {
        try {
            const createUser = await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );

            const userDB = await addUserDB({
                displayName: values.userName,
                email: auth.currentUser.email,
                uid: auth.currentUser.uid,
            });
        } catch (error) {
            console.log(error);
            handleError(error.code);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <>
            {/* <Button ghost type="primary" onClick={showModal}>
                Sign in
            </Button> */}
            <Modal
                title="Sign up"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[]}
            >
                <Form
                    form={form}
                    name="horizontal_login"
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: "Please input your username!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <UserOutlined className="site-form-item-icon" />
                            }
                            placeholder="username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Please input your email!",
                            },
                        ]}
                    >
                        <Input
                            prefix={
                                <MailOutlined className="site-form-item-icon" />
                            }
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !form.isFieldsTouched(true) ||
                                    !!form
                                        .getFieldsError()
                                        .filter(({ errors }) => errors.length)
                                        .length
                                }
                            >
                                Sign up
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default Signin;
