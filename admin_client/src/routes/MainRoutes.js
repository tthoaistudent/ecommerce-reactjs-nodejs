import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));
const Product = Loadable(lazy(() => import('pages/products')));
const Category = Loadable(lazy(() => import('pages/categories')));
const CreateProduct = Loadable(lazy(() => import('pages/products/components/CreateProduct')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: '/products',
            element: <Product />
        },
        {
            path: '/product/create',
            element: <CreateProduct />
        },
        {
            path: '/categories',
            element: <Category />
        }
    ]
};

export default MainRoutes;
