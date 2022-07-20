import { Spin } from "antd";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

function ProtectedRoute({ children }) {
    const { loggedIn, checkingStatus } = useContext(AuthContext);
    const location = useLocation();
    console.log(location.state?.from?.pathname);

    return checkingStatus ? (
        <Spin style={{ position: "fixed", top: "50%", left: "50%" }} />
    ) : loggedIn ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
}

export default ProtectedRoute;
