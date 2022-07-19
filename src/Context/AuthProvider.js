import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
const AuthContext = createContext();
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const userValue = {
        user,
        setUserName,
    };
    function setUserName(userName) {
        console.log("call set name");
        setUser({ ...user, userName: userName });
    }
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                console.log("det");
                setUser({
                    userName: user.displayName && user.displayName,
                    uid: user.uid,
                    email: user.email,
                });
            } else {
                setUser(null);
            }
        });
        return () => unsubscribed();
    }, []);
    return (
        <AuthContext.Provider value={userValue}>
            {children}
        </AuthContext.Provider>
    );
}
export { AuthContext };
export default AuthProvider;
