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
export const getFilms = (token: string, searchTerm?: string) => {
  if (!searchTerm) {
    return axios.get(serveurUrl + "/get/films", setHeaders(token));
  }
  return axios.get(
    serveurUrl + "/get/films?search=" + searchTerm,
    setHeaders(token)
  );
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

export const patchFilm = (token: string, uid: number, film: Film) => {
  return axios.patch(
    serveurUrl + "/patch/film/" + uid,
    {
      film,
    },
    setHeaders(token)
  );
};

export const deleteFilm = (token: string, uid: number) => {
  return axios.delete(serveurUrl + "/delete/film/" + uid, setHeaders(token));
};
