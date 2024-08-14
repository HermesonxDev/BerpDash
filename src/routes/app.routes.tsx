import { Routes, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard'
import List from '../pages/List'
import Layout from '../components/Layout';
import RecoveryPassword from '../pages/RecoveryPassword';
import Admin from '../pages/Admin';

const AppRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Dashboard />}/>
            <Route path="/list/:type" element={<List />}/>
            <Route path="/recovery-password" element={<RecoveryPassword />} />
            <Route path="/administration" element={<Admin />} />
        </Routes>
    </Layout>
)

export default AppRoutes;