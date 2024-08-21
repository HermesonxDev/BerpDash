import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'
import AdminPanel from '../pages/Admin';
import AdminGridEdit from '../components/AdminGridEdit';

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
                        <Route path="/administration/edit/user/:id" element={<AdminGridEdit />} />
                    </>
                }
            </Routes>
        </Layout>
    )
}

export default AppRoutes;