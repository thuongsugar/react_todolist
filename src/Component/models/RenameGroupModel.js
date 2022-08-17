import { Form, Input, Modal } from "antd";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { db } from "../../firebase/config";

function RenameGroupModel() {
    const { isRenameGr, setIsRenameGr, selectedGroup } = useContext(AppContext);
    // const [nameGrChange, setNameGrChange] = useState(selectedGroup.name);
    const [form] = Form.useForm();
    const handleCancel = () => {
        form.resetFields();
        setIsRenameGr(false);
    };
    const handleOk = async () => {
        const groupNameVal = form.getFieldValue("groupName");
        if (groupNameVal) {
            //update name gr db
            const docGr = doc(db, "groups", selectedGroup.id);
            await setDoc(
                docGr,
                { nameGroup: groupNameVal.trim() },
                { merge: true }
            );
            form.resetFields();
            setIsRenameGr(false);
        } else {
            form.validateFields(["groupName"]);
        }
    };
    return (
        <Modal
            onCancel={handleCancel}
            onOk={handleOk}
            visible={isRenameGr}
            title="Rename Group"
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

export default RenameGroupModel;
