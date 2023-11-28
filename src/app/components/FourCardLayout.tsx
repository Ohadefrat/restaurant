"use client";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const FourCardLayout = () => {
  return (
    <Grid container spacing={3}>
      {/* First card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Card 1</Typography>
            <Typography variant="body2">Description of Card 1</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Second card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Card 2</Typography>
            <Typography variant="body2">Description of Card 2</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Third card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Card 3</Typography>
            <Typography variant="body2">Description of Card 3</Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Fourth card */}
      <Grid item xs={12} sm={6} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5">Card 4</Typography>
            <Typography variant="body2">Description of Card 4</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FourCardLayout;
