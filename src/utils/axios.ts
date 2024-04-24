import axios from "axios";
import { Film } from "../Interface/database";

axios.defaults.headers.common["Content-Type"] = "application/json";

const serveurUrl = "http://localhost:5000";

const setHeaders = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getToken = (username: string, password: string) => {
  return axios.post(`${serveurUrl}/get/getToken`, {
    username,
    password,
  });
};
export const getFilms = (token: string) => {
  return axios.get(serveurUrl + "/get/films", setHeaders(token));
};

export const getFilm = (token: string, uid: number) => {
  return axios.get(serveurUrl + "/get/film/" + uid, setHeaders(token));
};

export const addFilm = (token: string, film: Film) => {
  return axios.post(
    serveurUrl + "/post/film/",
    {
      film,
    },
    setHeaders(token)
  );
};
