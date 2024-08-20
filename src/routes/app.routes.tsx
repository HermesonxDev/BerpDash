import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'
import AdminPanel from '../pages/Admin';
import UserProfile from '../pages/UserProfile';

const AppRoutes: React.FC = () => {
    
    const { Admin } = useAuth()

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/list/:type" element={<List />}/>

                {
                    Admin
                    &&
                    <>
                        <Route path="/administration/:type" element={<AdminPanel />} />
                        <Route path="/user/:id" element={<UserProfile />} />
                    </>
                }
            </Routes>
        </Layout>
    )
}

export default AppRoutes;