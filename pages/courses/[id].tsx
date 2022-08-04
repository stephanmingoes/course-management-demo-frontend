import React from "react";
import { useRouter } from "next/router";
import { GET_COURSE, GET_COURSES } from "../../gql/queries";
import { DELETE_COURSE } from "../../gql/mutations";
import { useMutation, useQuery } from "@apollo/client";
import UseHelper from "../../helper";
import { CourseResponse, CourseResponseList } from "../../interfaces";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import Link from "next/link";

const style = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  marginBottom: "1rem",
};

export default function Course() {
  const { query, push } = useRouter();
  const { HandleErrorPopup, HandleSuccessPopup } = UseHelper();
  const { loading, error, data } = useQuery<CourseResponse>(GET_COURSE, {
    variables: { id: query.id },
  });
  const [deleteCourse] = useMutation(DELETE_COURSE, {
    variables: { id: data?.course.id },
    onError() {
      HandleErrorPopup("Something went wrong trying to delete course!");
    },
    onCompleted() {
      push("/");
      HandleSuccessPopup("Course deleted successfully!");
    },
    update(cache, { data: { deleteCourse } }) {
      const courses = cache.readQuery<CourseResponseList>({
        query: GET_COURSES,
      })?.courses;

      cache.writeQuery({
        query: GET_COURSES,
        data: {
          courses: courses?.filter((course) => course.id !== deleteCourse.id),
        },
      });
    },
  });

  if (loading)
    return (
      <Grid container>
        <Grid item xs={12}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={250} />
        </Grid>
      </Grid>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ marginBottom: "1rem" }}>
        Error Displaying Course!
      </Alert>
    );

  return (
    <Grid container>
      <Grid item xs={12}>
        <Card>
          <CardActions>
            <Link href="/">
              <Button variant="contained">Home</Button>
            </Link>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                deleteCourse();
              }}
            >
              Delete
            </Button>
          </CardActions>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data?.course.name} - {data?.course.code}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {data?.course.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Lecturer Information
            </Typography>
            <Typography variant="body1" style={style}>
              <BadgeIcon fontSize="small" />
              &nbsp;{data?.course.lecturer.name}
            </Typography>
            <Typography variant="body1" style={style}>
              <EmailIcon fontSize="small" />
              &nbsp;{data?.course.lecturer.email}
            </Typography>
            <Typography variant="body1" style={style}>
              <LocalPhoneIcon fontSize="small" />
              &nbsp;{data?.course.lecturer.phone}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
