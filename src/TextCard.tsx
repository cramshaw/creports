import { Grid, Card, CardContent, CardHeader, Chip } from "@mui/material";

export default function TextCard({ element }) {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <CardHeader title={element.text || element.value} />
          <Chip label={element.component} />
        </CardContent>
      </Card>
    </Grid>
  );
}
