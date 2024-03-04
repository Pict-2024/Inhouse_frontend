<<<<<<< HEAD
const BASE_URL="http://10.10.15.150:8081/api/v1"
=======
const BASE_URL = "http://localhost:5000/api/v1";
>>>>>>> 02b1a27c7acf564dce358eb23e2d729279eae118

export const forgotPasswordAPI = `${BASE_URL}/auth/forgot-password`;
export const resetPasswordAPI = `${BASE_URL}/auth/reset-password`;
export const loginAPI = `${BASE_URL}/auth/login`;
export const verifyAPI = `${BASE_URL}/auth/verify`;
export const registerAPI = `${BASE_URL}/auth/register`;
