import {
  Box,
  Modal,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  Course,
  CourseResponse2,
  CourseResponseList,
  LecturerResponseList,
  Semester,
  Status,
} from "../interfaces";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES, GET_LECTURERS } from "../gql/queries";
import UseHelper from "../helper";
import { ADD_COURSE } from "../gql/mutations";
import ClassIcon from "@mui/icons-material/Class";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "300px",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};
const style2 = { width: "100%", marginBottom: "1.5rem" };

export default function AddCourseModal() {
  const [open, setOpen] = useState(false);
  const possibleStatuses: Status[] = [
    Status.IN_PROGRESS,
    Status.COMPLETED,
    Status.PENDING,
  ];
  const possibleSemesters: Semester[] = [
    Semester.ONE,
    Semester.TWO,
    Semester.THREE,
  ];
  const { loading, data, error } =
    useQuery<LecturerResponseList>(GET_LECTURERS);
  const [
    { lecturer, name, code, description, credits, semester, status },
    setCourse,
  ] = useState<Course>({
    lecturer: "",
    name: "",
    code: "",
    description: "",
    credits: 3,
    semester: Semester.ONE,
    status: Status.IN_PROGRESS,
  });
  const { HandleSuccessPopup, HandleErrorPopup } = UseHelper();
  const [addCourse] = useMutation(ADD_COURSE, {
    variables: { lecturer, name, code, description, credits, semester, status },
    onError() {
      handleClose();
      HandleErrorPopup("Something went wrong trying to add course!");
    },
    onCompleted() {
      handleClose();
      HandleSuccessPopup("Course added successfully!");
    },
    update(cache, { data: { addCourse } }) {
      const courses = cache.readQuery<CourseResponseList>({
        query: GET_COURSES,
      })?.courses;

      const newCourse: CourseResponse2 = {
        id: addCourse.id,
        name: addCourse.name,
        description: addCourse.description,
      };
      const newItems = courses ? [...courses, newCourse] : [newCourse];
      cache.writeQuery({ query: GET_COURSES, data: { courses: newItems } });
    },
  });

  const updateFields = (e: any) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCourse({
      lecturer: "",
      name: "",
      code: "",
      description: "",
      credits: 3,
      semester: Semester.ONE,
      status: Status.IN_PROGRESS,
    });
  };

  return (
    <>
      {" "}
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ marginBottom: "1rem" }}
      >
        <ClassIcon />
        &nbsp;&nbsp;Add Course
      </Button>
      {loading ? (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} component="form" noValidate>
            <CircularProgress />
          </Box>
        </Modal>
      ) : (
        <Modal open={open} onClose={handleClose}>
          <Box sx={style} component="form" noValidate>
            <Typography variant="h6" component="h2" gutterBottom>
              Add Course
            </Typography>
            <TextField
              onChange={updateFields}
              required
              sx={style2}
              type="text"
              name="name"
              label="Name"
              size="small"
              value={name}
            />
            <TextField
              required
              onChange={updateFields}
              sx={style2}
              name="code"
              placeholder="Example (COMP1126)"
              label="Code"
              type="text"
              size="small"
              value={code}
            />
            <TextField
              required
              onChange={updateFields}
              name="description"
              sx={style2}
              label="Description"
              type="text"
              size="small"
              value={description}
            />

            <TextField
              required
              onChange={updateFields}
              name="credits"
              sx={style2}
              label="Credits"
              type="number"
              size="small"
              value={credits}
            />
            <InputLabel id="lecturer-id-label">Lecturer</InputLabel>
            <Select
              required
              labelId="lecturer-id-label"
              id="lecturer-id"
              sx={style2}
              value={lecturer}
              name="lecturer"
              label="Lecturer"
              size="small"
              onChange={updateFields}
            >
              <MenuItem value="">
                <em>Select a Lecturer</em>
              </MenuItem>
              {data?.lecturers.map((l) => (
                <MenuItem value={l.id} key={l.id}>
                  {l.name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="semester-id-label">Semester</InputLabel>
            <Select
              required
              labelId="semester-id-label"
              id="semester-id"
              sx={style2}
              value={semester}
              name="semester"
              label="Semester"
              size="small"
              onChange={updateFields}
            >
              <MenuItem value="">
                <em>Select a Semester</em>
              </MenuItem>
              {possibleSemesters.map((s) => (
                <MenuItem value={s} key={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
            <InputLabel id="status-id-label">Status</InputLabel>
            <Select
              required
              labelId="status-id-label"
              id="status-id"
              sx={style2}
              value={status}
              name="status"
              label="Status"
              size="small"
              onChange={updateFields}
            >
              <MenuItem value="">
                <em>Select a Status</em>
              </MenuItem>
              {possibleStatuses.map((s) => (
                <MenuItem value={s} key={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              sx={{ marginRight: "1rem" }}
              onClick={() => {
                console.log({
                  lecturer: lecturer,
                  name: name,
                  code: code,
                  description: description,
                  credits: credits,
                  semester: semester,
                  status: status,
                });

                addCourse();
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" color="error" onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </Modal>
      )}
    </>
  );
}
