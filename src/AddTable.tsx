import { Box, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import ValueInput from "./ValueInput";

export default function AddTable({ setPageElements }) {
  const [newElement, setNewElement] = useState({
    component: "table-value",
    value: "pgx.recommendations",
  });

  const updateNewElement = (attr, event) => {
    if (Object.keys(newElement).includes(attr)) {
      setNewElement({ ...newElement, [attr]: event.target.value });
    }
  };

  const addElement = (event) => {
    event.preventDefault();
    setPageElements(newElement);
  };

  return (
    <Box component="form">
      <Grid container spacing={2}>
        {["value"].map((attr) => (
          <>
            <Grid item xs="12">
              <ValueInput
                value={newElement[[attr]]}
                updateNewElement={updateNewElement}
              />
            </Grid>
          </>
        ))}
        <Grid item xs="12">
          <Button onClick={addElement} variant="contained">
            Add element
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
