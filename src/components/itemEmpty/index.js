import React from "react";

// Material UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";

export default function EmptyItem() {
  return (
    <>
      <Grid container item>
        <Box sx={{ flexGrow: 1 }} />

        <Card sx={{ width: "auto" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ height: 1 / 2 }}
              image={"https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"}
              alt="Data Empty"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Empty press 'Create' for add new todo
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Box sx={{ flexGrow: 1 }} />
      </Grid>
    </>
  );
}
