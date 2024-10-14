import axios from 'axios';

export default axios.create({
    baseURL: 'https://auth-backend-138t.onrender.com/api/v1/users'
});