import axiosClient from './axiosClient';

const categoryApi = {
    getAll: () => {
        const url = 'categories';
        return axiosClient.get(url);
    },

    getOne: (id) => {
        const url = 'categories/' + id;
        return axiosClient.get(url);
    },

    create: (data) => {
        const url = 'categories';
        return axiosClient.post(url, data);
    },

    update: (id, data) => {
        const url = 'categories/' + id;
        return axiosClient.patch(url, data);
    },

    delete: (id) => {
        const url = 'categories/' + id;
        return axiosClient.delete(url);
    }
};

export default categoryApi;
