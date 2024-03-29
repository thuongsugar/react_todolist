import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import handleError from "../../error/handleError";
import { updateProfileDB } from "../../firebase/service";

function FormEditDisplayName() {
    const { user, setUserState } = useContext(AuthContext);
    console.log(user);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            form.setFieldsValue({ newDisplayName: user.displayName });
            form.getFieldInstance("newDisplayName").focus();
        }
    }, [user]);
    const onFinish = async (values) => {
        try {
            console.log(values.newDisplayName.trim());
            const userUpdate = await updateProfileDB(user.id, {
                displayName: values.newDisplayName.trim(),
            });
            handleError("success");
            console.log(userUpdate);
            setUserState(userUpdate);
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
                name="newDisplayName"
                rules={[
                    {
                        required: true,
                        message: "Please input your new name !",
                    },
                ]}
            >
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="new name ..."
                    // defaultValue={user ? user.userName : ""}
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
                            Update Display Name
                        </Button>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="default" onClick={() => navigate("..")}>
                        Cancel
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    );
}

export default FormEditDisplayName;
