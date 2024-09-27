import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard'
import AdminPanel from '../pages/Admin';
import AdminGridEdit from '../components/AdminGridEdit';
import Sales from '../pages/Sales';
import Delivery from '../pages/Delivery';
import PointOfSale from '../pages/PointOfSale';
import Development from '../pages/Development';
import Expenses from '../pages/Expenses';
import Discounts from '../pages/Discounts';
import Storage from '../pages/Storage';
import Audit from '../pages/Audit';

const AppRoutes: React.FC = () => {
    
    const { Admin } = useAuth()

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />}/>
                <Route path="/discounts" element={<Discounts />}/>
                <Route path="/expenses" element={<Expenses />}/>
                <Route path="/storage" element={<Storage />}/>
                <Route path="/sales" element={<Sales />} />
                <Route path="/point-of-sale" element={<PointOfSale />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/audit" element={<Audit />} />

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