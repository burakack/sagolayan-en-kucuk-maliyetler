import logo from './logo.svg';
import './App.css';
import MatrixTable from './components/enkucukmaliyetler';
import DansEdenSagopa from './components/dansEdenSagopa';
import { Grid } from '@mui/material';

function App() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}
      sx={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      >  
        <DansEdenSagopa />
      </Grid>
      <Grid item xs={8}>
        <MatrixTable />
      </Grid>
      <Grid item xs={2}
            sx={{ 
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
      >
        <DansEdenSagopa />
      </Grid>
    </Grid>
  );
}

export default App;
