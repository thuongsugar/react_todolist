import { Form, Input, Modal } from "antd";
import { useContext } from "react";
import { AppContext } from "../../Context/AppProvider";
import { addGroupDB } from "../../firebase/service";

function AddGroupModel() {
    const { isAddGroupVisible, setIsAddGroupVisible } = useContext(AppContext);
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setIsAddGroupVisible(false);
    };
    const handleOk = async () => {
        const groupNameVal = form.getFieldValue("groupName");
        if (groupNameVal) {
            await addGroupDB(groupNameVal);
            form.resetFields();
            setIsAddGroupVisible(false);
        } else {
            form.validateFields(["groupName"]);
        }
    };
    return (
        <Modal
            onCancel={handleCancel}
            onOk={handleOk}
            visible={isAddGroupVisible}
            title="Add Group"
        >
            <Form form={form}>
                <Form.Item
                    name="groupName"
                    label="Group name"
                    rules={[
                        { required: true, message: "Pleas input name group" },
                    ]}
                >
                    <Input
                        onPressEnter={handleOk}
                        placeholder="Group name..."
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default AddGroupModel;
