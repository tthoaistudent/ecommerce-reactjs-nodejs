// assets
import { LoginOutlined, ProfileOutlined, UnorderedListOutlined, PlusCircleOutlined } from '@ant-design/icons';

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    UnorderedListOutlined,
    PlusCircleOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
    id: 'group-product',
    title: 'Products',
    type: 'group',
    children: [
        {
            id: 'products',
            title: 'Product List',
            type: 'item',
            url: '/products',
            icon: icons.UnorderedListOutlined,
            target: false,
            breadcrumbs: false
        },
        {
            id: 'product-crate',
            title: 'Create product',
            type: 'item',
            url: '/product/create',
            icon: icons.PlusCircleOutlined,
            target: false,
            breadcrumbs: false
        },
        {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: '/categories',
            icon: icons.ProfileOutlined,
            target: false,
            breadcrumbs: false
        }
    ]
};

export default pages;
