let baseUrl = 'http://localhost:3030/';
let moviesUrl = `data/movies`;


export const requester = async (method, id, data) => {
    let fetchURL = '';
    let options = {}

    if (method === "GET") {
        if (id) {
            fetchURL = `${baseUrl}${moviesUrl}/${id}`;
            Object.assign(options, {
                headers: {
                    'X-Authorization': getToken()
                }
            })
        } else {
            fetchURL = `${baseUrl}${moviesUrl}`;
        }
    } else if (method === "DELETE") {
        console.log(fetchUrl);
        console.log(getToken());
        fetchURL = `${baseUrl}${moviesUrl}/${id}`;
        Object.assign(options, {
            method: "DELETE",
            headers: {
                'X-Authorization': getToken()
            }
        })
    } else if (method === "POST") {
        fetchURL = `${baseUrl}${moviesUrl}`;
        Object.assign(options, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify({
                title: data.title,
                description: data.description,
                img: data.imageUrl
            })
        })
    } else if (method === "PUT") {
        fetchURL = `${baseUrl}${moviesUrl}/${id}`;
        Object.assign(options, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify({
                title:data.title,
                description:data.description,
                img: data.imageUrl
            })
        })
    }
}