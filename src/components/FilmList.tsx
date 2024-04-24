import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

type ListFilmType = {
  id: number;
  nom: string;
  description: string;
  date_parution: string;
  note: 0 | 1 | 2 | 3 | 4 | 5;
}[];

type filmListProps = {
  title: string;
  data: ListFilmType | null;
};

const FilmList: React.FC<filmListProps> = ({ title, data }) => {
  const navigate = useNavigate();

  return (
    <>
      <Title>{title}</Title>
      {data ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date de parution</TableCell>
              <TableCell>Note</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((film) => (
              <TableRow
                key={film.id}
                onClick={() => navigate("/film/" + film.id)}
              >
                <TableCell>{film.id}</TableCell>
                <TableCell>{film.nom}</TableCell>
                <TableCell>{film.description}</TableCell>
                <TableCell>{film.date_parution}</TableCell>
                <TableCell>{film.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default FilmList;
