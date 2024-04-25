import { Box, Grid, Paper, Typography } from "@mui/material";

interface BlocResponseProps {
  responseJSON: any;
}

const BlocResponse: React.FC<BlocResponseProps> = ({ responseJSON }) => {
  return (
    <Paper>
      <Typography> Réponse requete : </Typography>
      <Box>
        <pre>{responseJSON}</pre>
      </Box>
    </Paper>
  );
};

export default BlocResponse;
