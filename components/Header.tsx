import React from "react";
import { Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
export default function componentName() {
  return (
    <>
      <Toolbar
        sx={{ backgroundColor: "#1495ff", color: "#fff", marginBottom: "1rem" }}
      >
        <Container maxWidth="lg">
          <Link href="/">
            <Typography
              variant="h6"
              sx={{ cursor: "pointer", display: "inline" }}
            >
              Course Management Demo 📚
            </Typography>
          </Link>
        </Container>
      </Toolbar>
    </>
  );
}
