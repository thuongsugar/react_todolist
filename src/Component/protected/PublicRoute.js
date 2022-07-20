import { Spin } from "antd";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

function PublicRoute({ children }) {
    const { loggedIn, checkingStatus } = useContext(AuthContext);

    return checkingStatus ? (
        <Spin style={{ position: "fixed", top: "50%", left: "50%" }} />
    ) : loggedIn ? (
        <Navigate to="/"></Navigate>
    ) : (
        children
    );
}

export default PublicRoute;
