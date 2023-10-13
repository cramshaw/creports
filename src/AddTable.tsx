import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

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
      {["value"].map((attr) => (
        <TextField
          label={attr}
          onChange={(event) => updateNewElement(attr, event)}
          value={newElement[attr]}
        />
      ))}
      <Button onClick={addElement}>Add element</Button>
    </Box>
  );
}
