import { getToken } from "./auth.js";

let baseUrl = "http://localhost:3030";
let loginUrl = `${baseUrl}/users/login`;
let registerUrl = `${baseUrl}/users/register`;
let logoutUrl = `${baseUrl}/users/logout`;

const requester = async (url, data) => {
  try {
    let fetchUrl = "";
    let response;
    if (url === loginUrl) {
      fetchUrl = loginUrl;
    } else if (url === registerUrl) {
      fetchUrl = registerUrl;
    } else if (url === logoutUrl) {
      fetchUrl = logoutUrl;
    }
    if (fetchUrl === loginUrl || fetchUrl === registerUrl) {
      response = await fetch(fetchUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      if (response.ok) {
        let jsonResponse = await response.json();
        return jsonResponse;
      } else {
        throw new Error("Your session have expired, please refresh the page.");
      }
    } else if (fetchUrl === logoutUrl) {
      response = await fetch(fetchUrl, {
        headers: {
          "X-Authorization": getToken(),
        },
      });
      if (response.status !== 204) {
        return response;
      }
    }
  } catch (err) {
    return err;
  }
};

export const login = requester.bind(null, loginUrl);
export const register = requester.bind(null, registerUrl);
export const logout = requester.bind(null, logoutUrl);
