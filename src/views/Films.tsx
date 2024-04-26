import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import Loading from "../components/Loading";
import FilmList from "../components/FilmList";
import { useAuth } from "../context/AuthProvider";
import AddFilm from "./AddFilm";
import BlocResponse from "../components/BlocResponse";
import { getFilms, getToken } from "../utils/axios";
import Title from "../components/Title";

const categories = [
  { uid: 1, name: "Action" },
  { uid: 2, name: "Adventure" },
  { uid: 3, name: "Drama" },
  { uid: 4, name: "Fantasy" },
  { uid: 5, name: "Horror" },
  { uid: 6, name: "Comedy" },
  { uid: 7, name: "Sci-Fi" },
  { uid: 8, name: "Documentary" },
  { uid: 9, name: "Romance" },
  { uid: 10, name: "Thriller" },
];

const Films = () => {
  const { isAuthenticated, token, login } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [responseJSON, setResponseJSON] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const res = await getFilms(
        token,
        search,
        page,
        rowsPerPage,
        selectedCategory
      );
      setData(res.data.data);
      setResponseJSON(JSON.stringify(res, null, 2));
    } catch (error) {
      const errorInfo = {
        message: error.response.data,
        status: error.response.status,
        statusText: error.response.statusText,
      };
      setResponseJSON(JSON.stringify({ errorInfo }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, [token, page, rowsPerPage, search, selectedCategory]);

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

      <Paper sx={{ p: 2 }}>
        <Title>Filtrer les films par catégorie</Title>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          fullWidth
          variant="outlined"
          sx={{ my: 2 }}
        >
          <MenuItem value="">Sélectionner une catégorie</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.uid} value={category.name}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </Paper>
      <AddFilm setRefreshData={fetchFilms} />
      <Paper sx={{ p: 2 }}>
        <FilmList title="Liste des films" data={data} />
      </Paper>
    </Box>
  );
};

export default Films;
