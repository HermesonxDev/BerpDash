import { Routes, Route } from 'react-router-dom';

import Layout from '../components/Layout';
import Admin from '../pages/Admin';
import UserProfile from '../pages/UserProfile';

const AdminRoutes: React.FC = () => (
    <Layout>
        <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/:type" element={<Admin />} />
            <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
    </Layout>
)

export default AdminRoutes