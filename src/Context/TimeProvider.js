import { createContext, useState } from "react";
const TimeContext = createContext();
function TimeProvider({ children }) {
    const [timeChoice, setTimeChoice] = useState(
        new Date().toLocaleDateString("en-GB") //string dd/mm/yyyy
    );
    return (
        <TimeContext.Provider value={[timeChoice, setTimeChoice]}>
            {children}
        </TimeContext.Provider>
    );
}
export { TimeContext };
export default TimeProvider;
