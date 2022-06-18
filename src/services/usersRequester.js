let baseUrl = 'http://localhost:3030';
let loginUrl = `${baseUrl}/users/login`;
let registerUrl = `${baseUrl}/users/register`



const requester = async (url, data) => {
    let fetchUrl = '';
    if (url === loginUrl) {
        fetchUrl = loginUrl;
    } else if (url === registerUrl) {
        fetchUrl = registerUrl;
    }
    let response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
    if(response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse;
    } else {
        throw new Error('Something went wrong with the request');
    }


}



export const login = requester.bind(null, loginUrl);
export const register = requester.bind(null, registerUrl);
