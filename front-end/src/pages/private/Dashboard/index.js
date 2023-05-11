import React from "react";
import Header from "../../../shared/header/index";
import { PageContent } from "../../../shared/styles";
import { Container } from "react-bootstrap";

export default function Dashboard() {
  return (
    <>
      <Header />
      <PageContent>
        <Container>
          <h2>Dashboard</h2>
          <p>Description...</p>
        </Container>
      </PageContent>
    </>
  )
}