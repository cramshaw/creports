import { TextField, Chip } from "@mui/material";
import { parseJson } from "./utils";
import { patientData } from "./data";
import { useState } from "react";

export default function ValueInput({ value, updateNewElement }) {
  const [foundValue, setFoundValue] = useState(value);

  const validateValue = (value) => {
    // N.B. Patient data shouldn't be imported, should be passed down
    // Or use context
    // Don't validate if it ends in a ., we know it's invalid
    if (value && !value.endsWith(".")) {
      let found = parseJson(value, patientData);
      if (["object", "array"].includes(typeof found)) {
        found = JSON.stringify(found);
      }
      setFoundValue(found);
    }
  };

  return (
    <>
      <TextField
        fullWidth
        label={"value"}
        onChange={(event) => {
          updateNewElement("value", event);
          validateValue(event.target.value);
        }}
        value={value}
      />
      <Chip
        color={foundValue !== undefined ? "success" : "error"}
        label={foundValue !== undefined ? "valid" : "invalid"}
      ></Chip>
      <Chip label={foundValue}></Chip>
    </>
  );
}
