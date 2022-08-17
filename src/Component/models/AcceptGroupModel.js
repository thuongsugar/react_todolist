import { Modal } from "antd";

function AcceptGroupModel() {
    function handleCancel() {}
    function handleOk() {}
    return (
        <Modal
            onCancel={handleCancel}
            onOk={handleOk}
            visible={{}}
            title="Member Group"
        ></Modal>
    );
}

export default AcceptGroupModel;
