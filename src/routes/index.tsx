import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/auth";

import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import AdminRoutes from "./admin.routes";

const Routes: React.FC = () => {
    
    const { logged, Admin } = useAuth()

    return (
        <BrowserRouter>
            {logged ? (Admin ? <AdminRoutes /> : <AppRoutes />) : <AuthRoutes />}
        </BrowserRouter>
    )
}

export default Routes