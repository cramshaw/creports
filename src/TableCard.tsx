import { Grid, Card, CardContent, CardHeader, Chip } from "@mui/material";

export default function TextCard({ element }) {
  return (
    <Grid item xs={3}>
      <Card>
        <CardContent>
          <CardHeader title="Table" />
          {element.head && element.head.map((head) => <Chip label={head} />)}
          {element.value && <Chip label={element.value} />}
        </CardContent>
      </Card>
    </Grid>
  );
}
