import axiosClient from './axiosClient';

const adminAuth = {
    login: (phone, password) => {
        const url = 'auth';
        return axiosClient.post(url, { phone, password });
    },
    getCurrentUser: () => {
        const url = 'auth';
        return axiosClient.get(url);
    }
};

export default adminAuth;
