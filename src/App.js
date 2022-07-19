import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TodoApp from "./Component/TodoApp";
import ShowInfo from "./Component/user/ShowInfo";
import ChangePassWord from "./Component/user/ChangePassWord";
import FormEditDisplayName from "./Component/user/FormEditDisplayName";
import FormEditEmail from "./Component/user/FormEditEmail";
import Login from "./Component/user/Login";
import Signin from "./Component/user/Signin";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TodoApp />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Signin />} />
                    <Route path="info" element={<ShowInfo />}>
                        <Route
                            path="edit-display-name"
                            element={<FormEditDisplayName />}
                        />
                        <Route path="edit-email" element={<FormEditEmail />} />
                    </Route>
                    <Route
                        path="change-password"
                        element={<ChangePassWord />}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
