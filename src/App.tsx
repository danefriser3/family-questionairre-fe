import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { Table } from './components/table/table';
import axios from 'axios';
import { Family } from './utils/types';
import { IconButton, Snackbar, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

function App() {

  const [dataset, setDataset] = useState<Family[] | null>(null);
  const [open, setOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [exported,] = useState<Family[]>(JSON.parse(sessionStorage.getItem("exported")!) ?? []);

  const fetchChildren = useCallback(() => {
    setDataset(null);
    axios.get('http://localhost:5000/api/children/childrenList').then(t =>
      setDataset(t.data.children.map((chil: Family) => {
        return {
          ...chil,
          exported: exported.find(ex => {
            return ex.id === chil.id;
          }) !== undefined,
          action: "delete"
        }
      }
      )))
      .catch(e => { setSnackbarMsg(e.message); setOpen(true); setDataset([]) });
  }, [exported])

  useEffect(() => {
    fetchChildren();
  }, [fetchChildren]);

  return (
    <div className="App">
      <Typography variant='h5' textAlign={"center"} fontWeight={"bold"} fontSize={"24px"}>Family questionairre</Typography>
      <Table dataset={dataset} load={fetchChildren} exported={exported} />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{
          ".MuiPaper-root": {
            backgroundColor: "white",
            color: "black",
            borderLeft: "5px solid red"
          }
        }}
        open={open}
        message={snackbarMsg}
        action={<IconButton onClick={() => setOpen(false)}><Close /></IconButton>}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export default App;
