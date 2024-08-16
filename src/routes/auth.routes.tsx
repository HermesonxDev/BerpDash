import { Routes, Route } from "react-router-dom";

import SignIn from "../pages/SignIn";
import RecoveryPassword from '../pages/RecoveryPassword';

const AuthRoutes: React.FC = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/recovery-password" element={<RecoveryPassword />} />
    </Routes>
)

export default AuthRoutes