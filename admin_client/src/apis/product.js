import axiosClient from './axiosClient';

const productApi = {
    addProduct: (data) => {
        const url = 'products';
        const config = {
            headers: {
                'Content-Types': 'multipart/form-data'
            }
        };
        return axiosClient.post(url, data, config);
    },
    getAll: () => {
        const url = 'products';
        return axiosClient.get(url);
    },
    delete: (id) => {
        const url = 'products/' + id;
        return axiosClient.delete(url);
    }
};

export default productApi;
