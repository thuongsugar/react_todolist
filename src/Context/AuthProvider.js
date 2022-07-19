import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
const AuthContext = createContext();
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    console.log(user);
    const userValue = {
        user,
        setUserName,
        setUserEmail,
    };
    console.log(userValue);
    function setUserName(userName) {
        setUser((userPrev) => ({ ...userPrev, userName }));
    }
    function setUserEmail(email) {
        setUser((userPrev) => ({ ...userPrev, email: email }));
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
