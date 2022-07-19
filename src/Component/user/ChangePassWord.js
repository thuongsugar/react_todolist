// import {} from "react";
import { LockOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Modal, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { updatePassWordDB } from "../../firebase/service";
import handleError from "../../error/handleError";
function ChangePassWord() {
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
                title="Change password"
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
                        name="newPass"
                        rules={[
                            {
                                required: true,
                                message: "Please input your new pass word!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={
                                <LockOutlined className="site-form-item-icon" />
                            }
                            placeholder="new pass word..."
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
                                Update
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}
export default ChangePassWord;
