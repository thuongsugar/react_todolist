import { useState, useRef, useContext, useEffect } from "react";
import { Space, Popover, Spin, Divider, Button } from "antd";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";
import { Link, Outlet, useNavigate } from "react-router-dom";

import TodoForm from "./TodoForm";
import ToDoList from "./TodoList";
import TodoCount from "./TodoCount";
import Login from "./user/Login";
import Logout from "./user/Logout";
import ChangePassWord from "./user/ChangePassWord";

import { addTodoDB, updateTodoDB, deleteDocDB } from "../firebase/service";

import { AuthContext } from "../Context/AuthProvider";
import { auth, db } from "../firebase/config";
import { TimeContext } from "../Context/TimeProvider";

function TodoApp() {
    const user = useContext(AuthContext);
    const [timeChoice, setTimeChoice] = useContext(TimeContext);
    const [todoList, setTodo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const stateTodoForm = useRef();
    const refModelLogin = useRef();

    useEffect(() => {
        if (user.user) {
            const todosRef = collection(db, "todos");
            const q = query(
                todosRef,
                where("uid", "==", auth.currentUser.uid),
                where("todoDate", "==", timeChoice),
                orderBy("input")
            );
            setLoading(true);
            const unsubscribed = onSnapshot(q, (querySnap) => {
                const document = querySnap.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }));
                console.log(document);
                setTodo(document);
                setLoading(false);
                return () => unsubscribed();
            });
        } else {
            setTodo([]);
        }
    }, [user.user, timeChoice]);

    function addTodo(inputData, indexTodo) {
        if (!auth.currentUser) {
            navigate("/login");
            refModelLogin.current();
        } else {
            console.log(indexTodo);
            if (inputData.input.trim().length > 0) {
                const timeCreate = new Date().toLocaleString("en-GB"); // dd/mm/yyy, hh:mm:ss
                let dataTime = {
                    todoDate: timeChoice,
                    createDate: timeCreate.split(",")[0],
                    createTime: timeCreate.split(",")[1],
                };
                //update todo
                if (typeof indexTodo !== "undefined") {
                    const todoUpdate = {
                        ...todoList[indexTodo],
                        input: inputData.input.trim(),
                    };
                    updateTodoDB(todoUpdate.id, todoUpdate);
                } else {
                    //new todo
                    addTodoDB({ ...inputData, ...dataTime });
                }
            }
        }
    }
    function stateFormInput(stateFormFun) {
        stateTodoForm.current = stateFormFun;
    }

    function handleComplete(index) {
        console.log(todoList[index]);
        todoList[index].isComplete = !todoList[index].isComplete;
        updateTodoDB(todoList[index].id, todoList[index]);
    }
    function upDateTodoForm(indexTodo) {
        stateTodoForm.current({
            index: indexTodo,
            input: todoList[indexTodo].input,
        });
    }
    async function handleDeleteTodo() {
        const todoSelected = todoList.filter(
            (todo) => todo.isComplete === true
        );
        const idListSelected = todoSelected.map((todo) => todo.id);
        await deleteDocDB(idListSelected);
    }
    return (
        <>
            <Space
                direction="vertical"
                style={{
                    width: "40%",
                    // minHeight: "100vh",
                    height: "100vh",
                    margin: "auto",
                    background: "#264653",
                    padding: "10px 10px",
                    // marginTop: "50px",
                    borderRadius: "15px",
                }}
            >
                <Space
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <h1 style={{ color: "#fffa" }}>TodoList</h1>
                    {user.user ? (
                        <Popover
                            content={
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        color: "#333",
                                    }}
                                >
                                    <Link to="info">Info</Link>
                                    <Link to="change-password">
                                        Change password
                                    </Link>
                                    <Divider style={{ margin: 0 }} />
                                    <Logout />
                                </div>
                            }
                            placement="rightTop"
                            // title={"Logout"}
                        >
                            <h2
                                style={{
                                    color: "#fff",
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                }}
                            >
                                {user.user.userName}
                            </h2>
                        </Popover>
                    ) : (
                        <Link to="login">
                            {/* <Login refModelLogin={refModelLogin} /> */}
                            <Button ghost>Login</Button>
                        </Link>
                    )}
                </Space>
                <TodoForm addTodo={addTodo} stateFormInput={stateFormInput} />
                {isLoading ? (
                    <Spin
                        size="large"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    />
                ) : (
                    <>
                        <ToDoList
                            todoList={todoList}
                            handleComplete={handleComplete}
                            upDateTodoForm={upDateTodoForm}
                            handleDeleteTodo={handleDeleteTodo}
                            // handleSelectTodo={handleSelectTodo}
                        />
                        <TodoCount toDoList={todoList} />
                    </>
                )}
            </Space>
            <Outlet />
        </>
    );
}
export default TodoApp;
