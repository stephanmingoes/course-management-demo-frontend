import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import {
  Alert,
  Box,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GET_LECTURERS } from "../gql/queries";
import { LecturerResponseList } from "../interfaces";
import LecturerTableDataRow from "./LecturerTableDataRow";

const Lecturers: React.FC = () => {
  const { loading, data, error } =
    useQuery<LecturerResponseList>(GET_LECTURERS);

  if (loading)
    return (
      <Box sx={{ marginBottom: "1rem" }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ marginBottom: "1rem" }}>
        Error Displaying Lecturers!
      </Alert>
    );

  return (
    <>
      <TableContainer component={Paper} sx={{ marginBottom: "1rem" }}>
        <Table aria-label="simple table" size="small">
          {/* Table Headings */}
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Table Row */}
            {data?.lecturers?.map((lecturer) => (
              <LecturerTableDataRow
                key={lecturer.id}
                id={lecturer.id}
                name={lecturer.name}
                email={lecturer.email}
                phone={lecturer.phone}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Lecturers;
