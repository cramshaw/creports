import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

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
      {["value", "label"].map((attr) => (
        <TextField
          label={attr}
          onChange={(event) => updateNewElement(attr, event)}
          value={newElement[attr]}
        ></TextField>
      ))}
      {["size"].map((attr) => (
        <TextField
          label={attr}
          onChange={(event) => updateNewElement(attr, event)}
          value={newElement.attributes[`${attr}`]}
        ></TextField>
      ))}
      <Button onClick={addElement}>Add element</Button>
    </Box>
  );
}
