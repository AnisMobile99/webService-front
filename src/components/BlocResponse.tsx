import { Box, Grid, Paper, Typography } from "@mui/material";
import Title from "./Title";

interface BlocResponseProps {
  responseJSON: any;
}

const BlocResponse: React.FC<BlocResponseProps> = ({ responseJSON }) => {
  return (
    <Paper style={{ maxHeight: 400, overflowY: "auto" }}>
      <Title>Réponse requete </Title>
      <Box>
        <pre>{responseJSON}</pre>
      </Box>
    </Paper>
  );
};

export default BlocResponse;
