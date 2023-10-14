import { useEffect, useState } from "react";
import "./App.css";
import {
  AppBar,
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import AddText from "./AddText";
import TextCard from "./TextCard";
import TableCard from "./TableCard";
import AddTable from "./AddTable";
import { patientData } from "./data";
import AddValue from "./AddValue";
import { parseJson } from "./utils";

function App() {
  const [componentType, setComponentType] = useState("text");

  const handleSelectComponent = (event) => {
    setComponentType(event.target.value);
  };

  const [pdfInfo, setPdfInfo] = useState("");

  // Default PDF schema
  const [pageElements, setPageElements] = useState([
    {
      component: "text",
      text: "PGX Report",
      attributes: {
        size: 30,
      },
    },
    {
      component: "value",
      value: "personal.name",
      label: "Name",
      attributes: {
        size: 20,
      },
    },
    {
      component: "table-value",
      value: "pgx.recommendations",
    },
    // {
    //   component: "table",
    //   head: ["Name", "Email", "Country"],
    //   content: Array.from(Array(50).keys()).map(() => {
    //     return ["David", "david@example.com", "Sweden"];
    //   }),
    // },
  ]);
  const updatePageElement = (newElement) => {
    setPageElements([...pageElements, newElement]);
  };

  // Method to add headers
  const addHeader = (pdf) => {
    pdf.setFontSize(10);
    pdf.text(
      "Page " + pdf.getCurrentPageInfo().pageNumber,
      10,
      pdf.internal.pageSize.getHeight() - 10
    );
  };

  const renderAddComponent = (componentType) => {
    switch (componentType) {
      case "text":
        return <AddText setPageElements={updatePageElement} />;
      case "value":
        return <AddValue setPageElements={updatePageElement} />;
      case "table":
        return <AddTable setPageElements={updatePageElement} />;
    }
  };

  useEffect(() => {
    async function createPDF() {
      const pdf = new jsPDF("p", "pt", "a4");

      const MARGIN = 20; // Increase to allow for header
      const FONT_SIZE = 30;
      pdf.setFontSize(FONT_SIZE);

      let runningY = MARGIN;

      for (const element of pageElements) {
        // Add page if no space left
        if (runningY >= pdf.internal.pageSize.getHeight() - MARGIN) {
          addHeader(pdf);
          pdf.setFontSize(FONT_SIZE);
          pdf.addPage("a4");
          runningY = MARGIN;
        }

        // Draw components
        switch (element.component) {
          case "text":
            pdf.text(element.text, MARGIN, runningY + FONT_SIZE);
            runningY = runningY + FONT_SIZE + MARGIN;
            break;
          case "value":
            const value = parseJson(element.value, patientData);
            pdf.text(
              `${element.label}: ${value}`,
              MARGIN,
              runningY + FONT_SIZE
            );
            runningY = runningY + FONT_SIZE + MARGIN;
            break;
          case "table":
            autoTable(pdf, {
              head: [element.head],
              body: element.content,
              startY: runningY,
              didDrawPage: function (data) {
                addHeader(pdf);
              },
            });
            runningY = pdf.lastAutoTable.finalY + 10;
            break;
          case "table-value":
            const tableData = parseJson(element.value, patientData);
            const head = tableData.slice(0, 1);
            const body = tableData.slice(1);
            autoTable(pdf, {
              head: [...head],
              body: body,
              startY: runningY,
              didDrawPage: function (data) {
                addHeader(pdf);
              },
            });
            runningY = pdf.lastAutoTable.finalY + 10;
            break;
          default:
            break;
        }
      }

      // Add final page number
      addHeader(pdf);

      const docURI = pdf.output("datauristring");
      setPdfInfo(docURI);
    }

    createPDF();
  }, [pageElements]);

  return (
    <>
      <AppBar position="sticky">
        <Typography variant="h3">PDF template builder</Typography>
      </AppBar>
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        {/* Cards showing all current components */}
        <Typography variant="h4">Elements</Typography>
        <Grid container spacing={2}>
          {pageElements.map((element) => {
            switch (element.component) {
              case "text":
                return <TextCard element={element} />;
              case "value":
                return <TextCard element={element} />;
              case "table":
                return <TableCard element={element} />;
              case "table-value":
                return <TableCard element={element} />;
            }
          })}
        </Grid>
      </Container>

      {/* Adding components */}
      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        <Typography variant="h4">Add elements</Typography>
        <FormControl fullWidth>
          <InputLabel>Component Type:</InputLabel>
          <Select
            value={componentType}
            label="Component"
            onChange={handleSelectComponent}
          >
            {["text", "table", "value"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Container>

      <Container
        sx={{
          marginTop: "20px",
        }}
      >
        {renderAddComponent(componentType)}
      </Container>

      {/* Preview */}
      <Typography variant="h4">Preview</Typography>
      <iframe
        title="test-frame"
        style={{ width: "100%", height: "100%" }}
        src={pdfInfo}
        type="application/pdf"
      />

      {/* Raw data */}
      <Typography variant="h4">Raw</Typography>
      <Box component="span" sx={{ display: "block" }}>
        <pre>{JSON.stringify(pageElements, null, 2)}</pre>
      </Box>
      <Typography variant="h4">Patient</Typography>
      <Box component="span" sx={{ display: "block" }}>
        <pre>{JSON.stringify(patientData, null, 2)}</pre>
      </Box>
    </>
  );
}

export default App;
