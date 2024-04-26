import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Chip, TableContainer, TablePagination } from "@mui/material";

type ListFilmType = {
  id: number;
  nom: string;
  description: string;
  date_parution: string;
  note: 0 | 1 | 2 | 3 | 4 | 5;
  categories: { uid: number; name: string }[];
}[];

type filmListProps = {
  title: string;
  data: ListFilmType | null;
};

const FilmList: React.FC<filmListProps> = ({ title, data }) => {
  const navigate = useNavigate();
  // État pour la pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, (data?.length || 0) - page * rowsPerPage);

  return (
    <>
      <Title>{title}</Title>
      {data ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Nom</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Catégorie</TableCell>
                  <TableCell>Date de parution</TableCell>
                  <TableCell>Note</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((film) => (
                    <TableRow
                      key={film.id}
                      onClick={() => navigate("/film/" + film.id)}
                    >
                      <TableCell>{film.id}</TableCell>
                      <TableCell>{film.nom}</TableCell>
                      <TableCell>{film.description}</TableCell>
                      <TableCell>
                        {film.categories ? (
                          film.categories.map((cat) => (
                            <Chip
                              key={cat.uid}
                              label={cat.name}
                              style={{ margin: "2px" }}
                            />
                          ))
                        ) : (
                          <> Aucune</>
                        )}
                      </TableCell>
                      <TableCell>{film.date_parution}</TableCell>
                      <TableCell>{film.note}</TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length} // Le nombre total d'éléments de données
            rowsPerPage={rowsPerPage} // Le nombre d'éléments par page
            page={page} // La page actuelle
            onPageChange={handleChangePage} // Gestionnaire de changement de page
            onRowsPerPageChange={handleChangeRowsPerPage} // Gestionnaire de changement du nombre d'éléments par page
            labelDisplayedRows={({ from, to, count }) =>
              `${page + 1} sur ${Math.ceil(count / rowsPerPage)},`
            } // Format personnalisé pour 'labelDisplayedRows'
            labelRowsPerPage="Éléments par page:" // Texte personnalisé pour 'labelRowsPerPage'
          />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FilmList;
