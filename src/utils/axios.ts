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
export const getFilms = (
  token: string,
  search?: string,
  page?: number,
  rowPerPage?: number
) => {
  // Construire les paramètres de la requête en fonction des arguments fournis
  const params = new URLSearchParams();

  // Ajouter le terme de recherche s'il est spécifié

  params.append("search", search);

  // Ajouter la pagination s'il elle est spécifiée
  if (page && rowPerPage) {
    console.log(page, rowPerPage);
    params.append("page", String(page));
    params.append("rowPerPage", String(rowPerPage));
  }

  // Effectuer la requête avec les paramètres et les en-têtes appropriés
  return axios.get(
    `${serveurUrl}/get/films?${params.toString()}`,
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
