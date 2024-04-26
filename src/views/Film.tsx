import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { deleteFilm, getFilm, patchFilm } from "../utils/axios";
import { useAuth } from "../context/AuthProvider";
import BlocResponse from "../components/BlocResponse";
import Title from "../components/Title";
import DeleteIcon from "@mui/icons-material/Delete";

interface FilmProps {
  id?: number;
  nom?: string;
  description?: string;
  date_parution?: string;
  note?: number;
  categories?: { uid: number; name: string }[];
}

const Film = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, login } = useAuth();
  const { uid } = useParams<{ uid: string }>(); // Typage pour useParams
  const [filmData, setFilmData] = useState<FilmProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [responseJSON, setResponseJSON] = useState(null);
  const [inputNom, setInputNom] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputNote, setInputNote] = useState("");
  const [refreshData, setRefreshData] = useState(false);

  const fetchFilmData = () => {
    setLoading(true);

    let filmID = 1;
    if (uid) filmID = parseInt(uid);
    getFilm(token, filmID)
      .then((res) => {
        const responseInfo = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
        };

        if (!refreshData)
          setResponseJSON(JSON.stringify(responseInfo, null, 2));

        console.log(res.data);
        setFilmData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        const errorInfo = {
          message: error.response.data,
          status: error.response.status,
          statusText: error.response.statusText,
        };

        if (!refreshData) setResponseJSON(JSON.stringify(errorInfo, null, 2));
        setLoading(false);
      });
  };

  useEffect(() => {
    if (uid && !refreshData) {
      fetchFilmData();
    }
  }, [uid, token, isAuthenticated, responseJSON, refreshData]);

  const handleUpdateFilm = async () => {
    const film: Partial<FilmProps> = {
      ...(inputNom && { nom: inputNom }),
      ...(inputDescription && { description: inputDescription }),
      ...(inputDate && { date_parution: inputDate }),
      ...(inputNote && { note: parseInt(inputNote) }),
    };
    try {
      const response = await patchFilm(token, filmData?.id, film);
      const responseInfo = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
      setResponseJSON(JSON.stringify(responseInfo, null, 2));
    } catch (error: any) {
      console.log(error);
      const errorInfo = {
        error: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
      setResponseJSON(JSON.stringify(errorInfo, null, 2));
    } finally {
      setRefreshData(true);
    }
  };

  const handleDeleteFilm = async () => {
    try {
      const response = await deleteFilm(token, filmData?.id);
      const responseInfo = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
      setResponseJSON(JSON.stringify(responseInfo, null, 2));
    } catch (error: any) {
      console.log(error);
      const errorInfo = {
        error: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
      setResponseJSON(JSON.stringify(errorInfo, null, 2));
    } finally {
      setRefreshData(true);
      // navigate("/films");
    }
  };
  if (loading) {
    return <Loading />;
  }
  if (!filmData) {
    return (
      <Box component="section">
        <Paper sx={{ p: 2 }}>Le film introuvable</Paper>
        <BlocResponse responseJSON={responseJSON} />
      </Box>
    );
  }
  if (filmData) {
    return (
      <Grid container gap={2}>
        {" "}
        {/* L'espacement s'applique entre les éléments de la grille */}
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Grid container item xs={12}>
            <Grid item xs={12}>
              <Title> Information du film</Title>
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
                  <strong>Categories: </strong>
                  {filmData.categories ? (
                    filmData.categories.map((cat) => (
                      <Chip
                        key={cat.uid}
                        label={cat.name}
                        style={{ margin: "2px" }}
                      />
                    ))
                  ) : (
                    <> Aucune</>
                  )}
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
            </Grid>
            <Grid
              container
              xs={6}
              gap={2}
              sx={{
                flexDirection: "column",
                display: "flex",
              }}
            >
              <Title> Modification du film</Title>

              <Grid
                item
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <InputLabel>Nom : </InputLabel>
                <Input
                  value={inputNom}
                  onChange={(e) => {
                    setInputNom(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <InputLabel>Description : </InputLabel>
                <Input
                  value={inputDescription}
                  onChange={(e) => {
                    setInputDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <InputLabel>Date parution : </InputLabel>
                <Input
                  value={inputDate}
                  onChange={(e) => {
                    setInputDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <InputLabel>Note : </InputLabel>
                <Input
                  value={inputNote}
                  onChange={(e) => {
                    setInputNote(e.target.value);
                  }}
                />
              </Grid>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    handleUpdateFilm();
                  }}
                >
                  {" "}
                  Confirmer{" "}
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              xs={6}
              sx={{
                flexDirection: "column",
                display: "flex",
              }}
              style={{ alignItems: "center" }}
            >
              <Title> Suppression du film</Title>
              <IconButton
                onClick={() => {
                  handleDeleteFilm();
                }}
                sx={{ display: "flex" }}
              >
                <DeleteIcon color="error" fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
        <Grid item xs={12}>
          {responseJSON && <BlocResponse responseJSON={responseJSON} />}
        </Grid>
      </Grid>
    );
  }
};

export default Film;
