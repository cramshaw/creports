import { Box, TextField, Button } from "@mui/material";
import { useState } from "react";

export default function AddText({ setPageElements }) {
  const [newElement, setNewElement] = useState({
    component: "text",
    text: "random text!",
    attributes: {
      size: 30,
    },
  });

  const updateNewElement = (attr, event) => {
    if (Object.keys(newElement).includes(attr)) {
      setNewElement({ ...newElement, [attr]: event.target.value });
    } else {
      setNewElement({
        ...newElement,
        attributes: {
          ...newElement.attributes,
          [attr]: parseInt(event.target.value) || 0,
        },
      });
    }
  };

  const addElement = (event) => {
    event.preventDefault();
    setPageElements(newElement);
  };

  return (
    <Box component="form">
      {["text"].map((attr) => (
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
