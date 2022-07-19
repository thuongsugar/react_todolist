import { Space } from "antd";
function TodoCount(props) {
    let completed = 0;
    let unCompleted = 0;
    props.toDoList.forEach((todo) => {
        todo.isComplete ? completed++ : unCompleted++;
    });
    return (
        <Space
            style={{
                justifyContent: "flex-end",
                display: "flex",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "500",
            }}
        >
            Total: {props.toDoList.length + ","} Completed: {completed + ","}{" "}
            UnCompleted:
            {unCompleted}
        </Space>
    );
}
export default TodoCount;
