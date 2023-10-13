import { useEffect, useState } from "react";
import { PDFDocument, PageSizes, StandardFonts, rgb } from "pdf-lib";
import "./App.css";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

function App() {
  const [pdfInfo, setPdfInfo] = useState("");

  const [newElement, setNewElement] = useState({
    component: "text",
    text: "random text!",
    attributes: {
      x: 200,
      y: 600,
      size: 30,
      color: rgb(0, 0.53, 0.71),
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

  const [pageElements, setPageElements] = useState([
    {
      component: "text",
      text: "A bit of data!",
      attributes: {
        x: 100,
        y: 500,
        size: 30,
        color: rgb(0, 0.53, 0.71),
      },
    },
  ]);

  const addElement = (event) => {
    event.preventDefault();
    setPageElements([newElement, ...pageElements]);
  };

  useEffect(() => {
    async function createPDF() {
      const pdfDoc = await PDFDocument.create();

      // Embed the Times Roman font
      // const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

      // Add a blank page to the document
      const page = pdfDoc.addPage(PageSizes.A4);

      // Get the width and height of the page
      const { width, height } = page.getSize();

      console.log(width, height);

      for (const element of pageElements) {
        switch (element.component) {
          case "text":
            page.drawText(element.text, element.attributes);
            break;
          default:
            break;
        }
      }

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();

      const bytes = new Uint8Array(pdfBytes);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const docUrl = URL.createObjectURL(blob);
      setPdfInfo(docUrl);
    }

    createPDF();
  }, [pageElements]);

  return (
    <>
      <AppBar position="sticky">
        <Typography variant="h2">PDF builder</Typography>
      </AppBar>
      <Container
        sx={{
          margin: "20px",
        }}
      >
        <Typography variant="h4">Elements</Typography>
        <Grid container spacing={2}>
          {pageElements.map((element) => (
            <Grid item xs={3}>
              <Card>
                <CardContent>
                  <CardHeader
                    title={element.text}
                    subheader={`${element.attributes.x}, ${element.attributes.y}`}
                  />
                  <Chip label={element.component} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container>
        <Box component="form">
          {["text"].map((attr) => (
            <TextField
              label={attr}
              onChange={(event) => updateNewElement(attr, event)}
              value={newElement[attr]}
            ></TextField>
          ))}
          {["x", "y"].map((attr) => (
            <TextField
              label={attr}
              onChange={(event) => updateNewElement(attr, event)}
              value={newElement.attributes[`${attr}`]}
            ></TextField>
          ))}
          <Button onClick={addElement}>Add element</Button>
        </Box>
      </Container>
      <h4>Preview</h4>
      <iframe
        title="test-frame"
        style={{ width: "100%", height: "100%" }}
        src={pdfInfo}
        type="application/pdf"
      />

      <Typography variant="h4">Raw</Typography>
      <Box component="span" sx={{ display: "block" }}>
        <pre>{JSON.stringify(pageElements, null, 2)}</pre>
      </Box>
    </>
  );
}

export default App;
