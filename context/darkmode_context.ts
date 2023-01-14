import { createContext } from "react";



export const DarkModeContext = createContext<{darkMode: boolean, setDarkMode: Function}>({darkMode: true, setDarkMode: ()=>{}})