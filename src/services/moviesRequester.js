let baseUrl = "http://localhost:3030/";
let gamesUrl = `data/games`;
import { getToken } from "./auth.js";

const requester = async (method, id, data) => {
  let fetchURL = "";
  let options = {};

  if (method === "GET") {
    if (id) {
      fetchURL = `${baseUrl}${gamesUrl}/${id}`;
      Object.assign(options, {
        headers: {
          "X-Authorization": getToken(),
        },
      });
    } else {
      fetchURL = `${baseUrl}${gamesUrl}?sortBy=_createdOn%20desc`;
    }
  } else if (method === "DELETE") {
    console.log(fetchUrl);
    console.log(getToken());
    fetchURL = `${baseUrl}${gamesUrl}/${id}`;
    Object.assign(options, {
      method: "DELETE",
      headers: {
        "X-Authorization": getToken(),
      },
    });
  } else if (method === "POST") {
    fetchURL = `${baseUrl}${gamesUrl}`;
    Object.assign(options, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-Authorization": getToken(),
      },
      body: JSON.stringify({
        title: data.title,
        category: data.category,
        maxLevel: data.maxLevel,
        imageUrl: data.imageUrl,
        summary: data.summary
      }),
    });
  } else if (method === "PUT") {
    fetchURL = `${baseUrl}${gamesUrl}/${id}`;
    Object.assign(options, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "X-Authorization": getToken(),
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        img: data.imageUrl,
      }),
    });
  }
  let response;
  if (Object.entries(options).length > 0) {
    response = await fetch(fetchURL, options);
  } else {
    response = await fetch(fetchURL);
  }
  let jsonResponse = await response.json();
  return jsonResponse;
};
export const getAllGames = requester.bind(null, "GET");
export const createGame = requester.bind(null, "POST");

