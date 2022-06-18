export const getUserData = () => {
    let username = localStorage.getItem('username');
    let email = localStorage.getItem('email');
    let accessToken = localStorage.getItem('accessToken');
    let _id = localStorage.getItem('_id');
    if(username && email && accessToken && _id) {
        return {
            username,
            email,
            accessToken,
            _id
        }
    } else { 
        return false;
    }  
}
export const saveUserData = (data) => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('_id', data._id);
    localStorage.setItem('accessToken', data.accessToken);
}