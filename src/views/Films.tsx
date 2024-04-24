import { Box, Paper } from "@mui/material";
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

  const fetchFilmsData = async () => {
    if (!isAuthenticated) {
      try {
        const response = await getToken("admin", "admin");
        login(response.data.token);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    } else {
      try {
        const res = await getFilms(token);
        console.log("films", res.data);
        setData(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(isAuthenticated, token);
    fetchFilmsData();
  }, [isAuthenticated, token, login]);

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
          {" "}
          <Loading />{" "}
          <div style={{ marginLeft: 10 }}> Erreur de chargement </div>
        </div>
      ) : (
        <>
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
