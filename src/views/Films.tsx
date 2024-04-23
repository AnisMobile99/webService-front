import { Box, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getFilms, getToken } from "../utils/axios";
import Loading from "../components/Loading";
import FilmList from "../components/FilmList";
import { useAuth } from "../AuthProvider";

const Films = () => {
  const { token, isAuthenticated, login } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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
    console.log(isAuthenticated);
    fetchFilmsData();
  }, [token, isAuthenticated, login]);
  return (
    <Box component="section">
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
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
            <div style={{ marginLeft: 10 }}> Erreur de chargement {error}</div>
          </div>
        ) : (
          <FilmList title="Liste des films" data={data} />
        )}
      </Paper>
    </Box>
  );
};

export default Films;
