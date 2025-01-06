import {Route, Routes} from "react-router-dom";

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";
import Password from "./pages/auth/password";
import DigitCode from "./pages/auth/password/digit-code";
import './App.css'

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signin" element={<SignIn/>}/>
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/password" element={<Password/>}/>
                <Route path="/digit-code" element={<DigitCode/>}/>

            </Routes>
        </div>
    );
}

export default App;
