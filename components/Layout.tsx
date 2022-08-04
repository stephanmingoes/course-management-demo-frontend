import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Header from "./Header";
import client from "../gql";
import { SnackbarProvider } from "notistack";
type LayoutType = {
  children: React.ReactNode;
};

import { ApolloProvider } from "@apollo/client";

const Layout: React.FC<LayoutType> = ({ children }) => {
  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <ApolloProvider client={client}>
          {" "}
          <CssBaseline />
          <Header />
          <Container maxWidth="lg">{children}</Container>
        </ApolloProvider>
      </SnackbarProvider>
    </>
  );
};

export default Layout;
