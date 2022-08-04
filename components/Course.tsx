import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import { CourseResponse2 } from "../interfaces";

const Course: React.FC<CourseResponse2> = (course) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Card
        sx={{
          display: "flex",
          height: "93px",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#2d8fff ",
            borderRadius: "10px",
          },
        }}
      >
        <CardContent sx={{ flex: "3" }}>
          <Typography variant="h6">{course.name}</Typography>
          <Typography variant="subtitle1">{course.description}</Typography>
        </CardContent>
        <CardActions sx={{ flex: "1" }}>
          <Link href={`courses/${course.id}`}>
            <Button variant="text">View</Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  );
};
export default Course;
