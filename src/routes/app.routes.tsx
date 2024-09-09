import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard'
import List from '../pages/List'
import AdminPanel from '../pages/Admin';
import AdminGridEdit from '../components/AdminGridEdit';
import Sales from '../pages/Sales';
import Delivery from '../pages/Delivery';
import PointOfSale from '../pages/PointOfSale';
import Development from '../pages/Development';

const AppRoutes: React.FC = () => {
    
    const { Admin } = useAuth()

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/list/:type" element={<List />}/>
                <Route path="/sales" element={<Sales />} />
                <Route path="/point-of-sale" element={<PointOfSale />} />
                <Route path="/delivery" element={<Delivery />} />

                {Admin &&
                    <> 
                        <Route path="/administration/:type" element={<AdminPanel />} />
                        <Route path="/administration/edit/user/:id" element={<AdminGridEdit />} />
                        <Route path="/development" element={<Development />} />
                    </>
                }

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    )
}

export default AppRoutes;