import axios from 'axios';
const BaseUrl = import.meta.env.VITE_BACKEND_URL;
// export const loginUser = async ( username, password ) => {
//     const {data}=axios.post( `${BaseUrl}/api/users/login`, { username, password } );
//     localStorage.setItem('token', data.token); // Store token for authentication

//     return axios.post( `${BaseUrl}/api/users/login`, { username, password } );
   
// };
export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${BaseUrl}/api/users/login`, { username, password });
        const { token } = response.data;

        if (!token) {
            throw new Error('Token is missing in the response');
        }

        localStorage.setItem('token', token); // Store token for authentication
        return response;
    } catch (error) {
        console.error('Error in loginUser:', error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};
export const registerUser = async ( userData ) => {
    console.log( userData )
    return axios.post( `${BaseUrl}/api/users/register  `, userData );
};

export const getUsers = async ( token ) => {
    return axios.get( `${BaseUrl}/api/users`, { headers: { Authorization: `Bearer ${token}` } } );
};
