import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { getUserDB } from "../firebase/service";
const AuthContext = createContext();
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const userValue = {
        user,
        loggedIn,
        checkingStatus,
        setUserState,
        setUserEmail,
    };
    function setUserState(user) {
        setUser((userPrev) => ({ ...userPrev, ...user }));
    }
    function setUserEmail(email) {
        setUser((userPrev) => ({ ...userPrev, email: email }));
    }
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged(async (user) => {
            console.log(user);
            if (user) {
                console.log("det");
                const userDB = await getUserDB(user.uid);
                console.log(userDB);
                userDB
                    ? setUser({
                          displayName: userDB.displayName,
                          uid: userDB.uid,
                          email: userDB.email,
                          id: userDB.id,
                      })
                    : setUser(null);
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
                setUser(null);
            }
            setCheckingStatus(false);
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
