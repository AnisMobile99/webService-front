import { Box, Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import { getSportifs } from "../utils/axios";
import Loading from "../components/Loading";

const Sportifs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSportifsData = () => {
    setLoading(true);
    getSportifs("test")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSportifsData();
  }, []);

  return (
    <Box component="section">
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        {loading ? (
          <Loading />
        ) : !data ? (
          <span>Erreur de chargement {error}</span>
        ) : (
          <UsersList title="Liste des sportifs" data={data} />
        )}
      </Paper>
    </Box>
  );
};

export default Sportifs;
