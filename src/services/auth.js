export const getUserData = () => {
    let email = localStorage.getItem('email');
    let accessToken = localStorage.getItem('accessToken');
    let _id = localStorage.getItem('_id');
    if(email && accessToken && _id) {
        return {
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

export const getToken = () => {
   let accessToken =  localStorage.getItem('accessToken');
   return accessToken;
}

export const removeUserData = () => {
    localStorage.clear();
}