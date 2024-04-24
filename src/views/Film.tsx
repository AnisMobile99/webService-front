import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { getFilm } from "../utils/axios";
import { useAuth } from "../context/AuthProvider";

interface FilmProps {
  id: number;
  nom: string;
  description: string;
  date_parution: string;
  note: number;
}

const Film = () => {
  const { token, isAuthenticated, login } = useAuth();
  const { uid } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFilmData = () => {
    setLoading(true);

    let filmID = 1;
    if (uid) filmID = parseInt(uid);
    getFilm(token, filmID)
      .then((res) => {
        console.log(res.data);
        setFilmData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (uid) {
      fetchFilmData();
    }
  }, [uid, token, isAuthenticated]);

  if (loading) {
    return <Loading />;
  }
  if (!filmData) {
    return (
      <Box component="section">
        <Paper sx={{ p: 2 }}>Le film introuvable</Paper>
      </Box>
    );
  }
  if (filmData) {
    return (
      <Box component="section">
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Box>
            <Typography variant="h6">
              <strong>ID: </strong>
              {filmData.id}
            </Typography>

            <Typography variant="h6">
              {" "}
              <strong>Nom: </strong>
              {filmData.nom}
            </Typography>

            <Typography variant="h6">
              <strong>Description: </strong>
              {filmData.description}
            </Typography>

            <Typography variant="h6">
              {" "}
              <strong>Date: </strong>
              {filmData.date_parution}
            </Typography>

            <Typography variant="h6">
              {" "}
              <strong>Note: </strong>
              {filmData.note}
            </Typography>

            {/* DEGREES */}
            <Grid container spacing={6}>
              <Grid item xs={12}>
                <Typography variant="h5"></Typography>
                <Grid container spacing={3}></Grid>
              </Grid>
            </Grid>
            {/* LEGAL DOCUMENTS */}
          </Box>
        </Paper>
      </Box>
    );
  }
};

export default Film;
