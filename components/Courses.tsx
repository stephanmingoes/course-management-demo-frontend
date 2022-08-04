import React from "react";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../gql/queries";
import { CourseResponseList } from "../interfaces";
import { Alert, Grid, Skeleton } from "@mui/material";
import Course from "./Course";

export default function Courses() {
  const { loading, error, data } = useQuery<CourseResponseList>(GET_COURSES);
  if (loading)
    return (
      <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
        <Grid item xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height={60} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height={60} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Skeleton variant="rectangular" height={60} />
        </Grid>
      </Grid>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ marginBottom: "1rem" }}>
        Error Displaying Courses!
      </Alert>
    );

  return (
    <Grid container spacing={2} sx={{ marginBottom: "2rem" }}>
      {data?.courses.map((course) => (
        <Course
          key={course.id}
          id={course.id}
          name={course.name}
          description={course.description}
        />
      ))}
    </Grid>
  );
}
