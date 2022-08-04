import { useMutation } from "@apollo/client";
import { TableCell, TableRow, IconButton } from "@mui/material";
import React from "react";
import { DELETE_LECTURER } from "../gql/mutations";
import { LecturerResponse } from "../interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import UseHelper from "../helper";
import { GET_LECTURERS, GET_COURSES } from "../gql/queries";

const LecturerTableRowData: React.FC<LecturerResponse> = (lecturer) => {
  const { HandleSuccessPopup, HandleErrorPopup } = UseHelper();
  const [deleteLecturer] = useMutation(DELETE_LECTURER, {
    variables: { id: lecturer.id },
    onError() {
      HandleErrorPopup("Something went wrong trying to delete lecturer!");
    },
    onCompleted() {
      HandleSuccessPopup("Lecturer deleted successfully!");
    },
    refetchQueries: [{ query: GET_COURSES }, { query: GET_LECTURERS }],
  });

  return (
    <TableRow
      key={lecturer.name}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {lecturer.name}
      </TableCell>
      <TableCell>{lecturer.email}</TableCell>
      <TableCell>{lecturer.phone}</TableCell>
      <TableCell>
        <IconButton
          onClick={() => {
            deleteLecturer();
          }}
        >
          <DeleteIcon color="error" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default LecturerTableRowData;
