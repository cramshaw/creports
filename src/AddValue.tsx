import { Box, TextField, Button, Grid } from "@mui/material";
import { useState } from "react";
import ValueInput from "./ValueInput";

export default function AddValue({ setPageElements }) {
  const [newElement, setNewElement] = useState({
    component: "value",
    value: "personal.name",
    label: "label",
    attributes: {
      size: 30,
    },
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
        {["label"].map((attr) => (
          <Grid item sm="4">
            <TextField
              label={attr}
              onChange={(event) => updateNewElement(attr, event)}
              value={newElement[attr]}
            ></TextField>
          </Grid>
        ))}
        {["size"].map((attr) => (
          <Grid item sm="4">
            <TextField
              label={attr}
              onChange={(event) => updateNewElement(attr, event)}
              value={newElement.attributes[`${attr}`]}
            ></TextField>
          </Grid>
        ))}
        <Grid item sm="3">
          <Button onClick={addElement} variant="contained">
            Add element
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
