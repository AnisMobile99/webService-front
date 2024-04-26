import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from "@mui/material";
import Loading from "../components/Loading";
import FilmList from "../components/FilmList";
import { useAuth } from "../context/AuthProvider";
import AddFilm from "./AddFilm";
import BlocResponse from "../components/BlocResponse";
import { getFilms, getToken } from "../utils/axios";
import Title from "../components/Title";

const Films = () => {
  const { isAuthenticated, token, login } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [responseJSON, setResponseJSON] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const res = await getFilms(token, search, page, rowsPerPage);
      setData(res.data.data);
      setResponseJSON(JSON.stringify(res, null, 2));
    } catch (error) {
      setResponseJSON(JSON.stringify({ message: error.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFilms();
    }
  }, [token, page, rowsPerPage, search]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <BlocResponse responseJSON={responseJSON} />
      <Paper sx={{ p: 2 }}>
        <Title>Filtrer les films par recherche</Title>
        <TextField
          label="Recherche par titre ou description"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ my: 2 }}
        />
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Title>Filtrer les films par pagination</Title>
        <TextField
          label="Page"
          type="number"
          value={page}
          onChange={(e) => setPage(parseInt(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">Page</InputAdornment>,
          }}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Lignes par page"
          type="number"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">Rows</InputAdornment>,
          }}
        />
      </Paper>
      <AddFilm setRefreshData={fetchFilms} />
      <Paper sx={{ p: 2 }}>
        <FilmList title="Liste des films" data={data} />
      </Paper>
    </Box>
  );
};

export default Films;
