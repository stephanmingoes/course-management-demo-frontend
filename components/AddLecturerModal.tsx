import { Box, Modal, Typography, Button, TextField } from "@mui/material";
import { Lecturer, LecturerResponseList } from "../interfaces";
import { useMutation } from "@apollo/client";
import { GET_LECTURERS } from "../gql/queries";
import UseHelper from "../helper";
import { ADD_LECTURER } from "../gql/mutations";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
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
  const [{ name, email, phone }, setLecturer] = useState<Lecturer>({
    name: "",
    email: "",
    phone: "",
  });
  const { HandleSuccessPopup, HandleErrorPopup } = UseHelper();
  const [addLecturer] = useMutation(ADD_LECTURER, {
    variables: { name, email, phone },
    onError() {
      handleClose();
      HandleErrorPopup("Something went wrong trying to add lecturer!");
    },
    onCompleted() {
      handleClose();
      HandleSuccessPopup("Lecturer added successfully!");
    },
    update(cache, { data: { addLecturer } }) {
      const lecturers = cache.readQuery<LecturerResponseList>({
        query: GET_LECTURERS,
      })?.lecturers;

      const newItems = lecturers ? [...lecturers, addLecturer] : [addLecturer];

      cache.writeQuery({
        query: GET_LECTURERS,
        data: { lecturers: newItems },
      });
    },
  });

  const updateFields = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLecturer((prev) => ({ ...prev, [name]: value }));
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setLecturer({
      name: "",
      email: "",
      phone: "",
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
        <PersonAddIcon />
        &nbsp;&nbsp;Add Lecturer
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style} component="form" noValidate>
          <Typography variant="h6" component="h2" gutterBottom>
            Add Lecturer
          </Typography>
          <TextField
            onChange={updateFields}
            sx={style2}
            type="text"
            name="name"
            label="Name"
            size="small"
            value={name}
          />
          <TextField
            onChange={updateFields}
            sx={style2}
            name="email"
            label="Email"
            type="email"
            size="small"
            value={email}
          />
          <TextField
            onChange={updateFields}
            name="phone"
            sx={style2}
            label="Phone"
            type="tel"
            size="small"
            value={phone}
          />

          <Button
            variant="contained"
            sx={{ marginRight: "1rem" }}
            onClick={() => {
              addLecturer();
            }}
          >
            Submit
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </>
  );
}
