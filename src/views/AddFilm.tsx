import {
  Box,
  Button,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { addFilm } from "../utils/axios";
import { useAuth } from "../context/AuthProvider";
import { Film } from "../Interface/database";

const AddFilm = () => {
  const { token } = useAuth();
  const [addFilmModal, setAddFilmModal] = useState(false);
  const [inputNom, setInputNom] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [inputNote, setInputNote] = useState("");
  const [responseJSON, setResponseJSON] = useState(null);

  const handleSubmit = async () => {
    let film: Film = {
      nom: inputNom,
      description: inputDescription,
      date_parution: inputDate,
      note: parseInt(inputNote),
    };
    try {
      const response = await addFilm(token, film);
      const responseInfo = {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
      };
      setResponseJSON(JSON.stringify(responseInfo));
    } catch (error: any) {
      console.log(error);
      const errorInfo = {
        error: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
      setResponseJSON(JSON.stringify(errorInfo));
    }
  };
  return (
    <Box component="section">
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Typography
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
          onClick={() => {
            setAddFilmModal(addFilmModal ? false : true);
          }}
        >
          Ajout d'un film
        </Typography>
        <Box
          sx={{
            display: addFilmModal ? "flex" : "none",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Grid
            container
            gap={2}
            sx={{
              flexDirection: "column",
              display: "flex",
            }}
          >
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
                  handleSubmit();
                }}
              >
                {" "}
                Confirmer{" "}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              border: "1px solid black",
              flexDirection: "column",
            }}
          >
            <Typography> Réponse requete : </Typography>
            <Box>{responseJSON && responseJSON}</Box>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddFilm;
