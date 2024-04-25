import { Box, Paper, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFilms, getToken } from "../utils/axios";
import Loading from "../components/Loading";
import FilmList from "../components/FilmList";
import { useAuth } from "../context/AuthProvider";
import AddFilm from "./AddFilm";

const Films = () => {
  const { isAuthenticated, token, login } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // state pour gérer le texte de recherche

  const fetchFilmsData = async (searchTerm = "") => {
    setLoading(true);

    try {
      const res = await getFilms(token, searchTerm);
      console.log("Réponse de la recherche : ", res.data);
      if (!res.data.isExists) {
        alert(res.data.message); // Alert ou autre méthode de notification
      } else {
        setData(res.data.data); // Assurez-vous de récupérer les films sous la propriété 'data'
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des films: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Appel initial pour charger les données
  useEffect(() => {
    fetchFilmsData();
  }, [isAuthenticated, token]);

  // Gestionnaire pour le champ de recherche
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Gestionnaire pour le bouton de recherche
  const handleSearch = () => {
    fetchFilmsData(search);
  };

  return (
    <Box
      component="section"
      gap={4}
      sx={{ display: "flex", flexDirection: "column" }}
    >
      {loading ? (
        <Loading />
      ) : !data ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
          <div style={{ marginLeft: 10 }}>Erreur de chargement</div>
        </div>
      ) : (
        <>
          <Box sx={{ p: 2 }}>
            <TextField
              label="Rechercher par titre ou description"
              variant="outlined"
              fullWidth
              value={search}
              onChange={handleSearchChange}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSearch} sx={{ mb: 2 }}>
              Rechercher
            </Button>
          </Box>
          <AddFilm />
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <FilmList title="Liste des films" data={data} />
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Films;
