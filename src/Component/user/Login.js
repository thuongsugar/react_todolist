import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Modal, Form, Input } from "antd";

import Signin from "./Signup";

import handleError from "../../error/handleError";
import { auth } from "../../firebase/config";

function Login() {
    console.log("xo");
    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [, forceUpdate] = useState({}); // To disable submit button at the beginning.
    const [isModalVisible, setIsModalVisible] = useState(true);
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        if (!isModalVisible) {
            navigate("..");
        }
    }, [isModalVisible]);
    function handleModelLogin() {
        setIsModalVisible(true);
    }
    useEffect(() => {
        forceUpdate({});
    }, []);

    const onFinish = async (values) => {
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            navigate(from, { replace: true });
            setIsModalVisible(true);
            // console.log(user);
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
            {/* <Button ghost onClick={showModal}>
                Login
            </Button> */}
            <Modal
                title="Login"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Link to="/register">
                        <Button>Sign in</Button>
                    </Link>,
                ]}
            >
                <Form
                    form={form}
                    name="horizontal_login"
                    layout="vertical"
                    onFinish={onFinish}
                >
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
                                Log in
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default Login;
