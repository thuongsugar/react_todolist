import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthProvider";
import handleError from "../../error/handleError";
import { updateEmailDB } from "../../firebase/service";

function FormEditEmail() {
    const { user, setUserEmail } = useContext(AuthContext);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({ newMail: user.email });
            form.getFieldInstance("newMail").focus();
        }
    }, [user]);

    const onFinish = async (values) => {
        try {
            await updateEmailDB(values.newMail.trim());
            handleError("success");
            setUserEmail(values.newMail.trim());
            navigate("..");
        } catch (error) {
            console.log(error);
            handleError(error.code);
        }
    };
    return (
        <Form
            form={form}
            name="horizontal_login"
            layout="vertical"
            onFinish={onFinish}
        >
            <Form.Item
                name="newMail"
                rules={[
                    {
                        required: true,
                        message: "Please input your new mail !",
                    },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="new mail ..."
                    // defaultValue={user ? user.email : ""}
                />
            </Form.Item>
            <Space>
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
                            Update Email
                        </Button>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button onClick={() => navigate("..")}>Cancel</Button>
                </Form.Item>
            </Space>
        </Form>
    );
}

export default FormEditEmail;
