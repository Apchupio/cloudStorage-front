import axios from 'axios';

export const CloudStorageApiConfig = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true
});

CloudStorageApiConfig.interceptors.response.use(
    (response) => {
        console.log('✅ Response OK:', response.status);
        return response;
    },
    (error) => {
        console.log('❌ Error caught:', error.response?.status);

        if (error.response?.status === 403) {
            console.log('🔒 403 DETECTED - logout');
            window.location.href = '/api/cloude-storage/sign-in';
        }
        return Promise.reject(error);
    }
);

console.log('Interceptor registered');