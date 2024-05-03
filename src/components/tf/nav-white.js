import React, { useEffect, useState, useRef } from "react";
import { withPreview } from "gatsby-source-prismic";
import styled, { createGlobalStyle } from "styled-components";
import { useMediaQuery } from "./media-query";
import { graphql, Link } from "gatsby";

const NavCon = styled.div`
  width: calc(31.25% - 10px);
  margin-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr;
  position: fixed;
  top: 10px;
  z-index: 200000;

  @media (max-width: 640px) {
    width: calc(100vw - 20px);
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/;
  }
`;
const NavP = styled.p`
  color: #af9880 !important;
  padding-left: 8px;
  font-size: 24px;
  font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
  font-variation-settings: "wght" 340;
  line-height: 140%;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media (max-width: 640px) {
    color: white;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 18px;
    letter-spacing: -0.1px;
    line-height: 140%;
    padding-left: 6px;
  }
`;
const LogoCon = styled.div`
  grid-column: span 3;
  background-color: white;
  border: 1px solid #af9880;
  border-right: none;
  padding-right: 5px;
  :hover {
    background-color: #af9880;
    p {
      color: white !important;
    }
  }
  @media (max-width: 640px) {
    grid-column: span 2;
  }
`;
const IndexCon = styled.div`
  grid-column: span 1;
  background-color: white;
  border: 1px solid #af9880;
  border-right: none;
  padding-right: 5px;
  :hover {
    background-color: #af9880;
    p {
      color: white !important;
    }
  }
  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;
const AboutCon = styled.div`
  grid-column: span 1;
  background-color: white;
  border: 1px solid #af9880;
  padding-right: 5px;
  :hover {
    background-color: #af9880;
    p {
      color: white !important;
    }
  }
  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;

export const NavWhite = whiteNavProps => {
  console.log();
  return (
    <>
      <NavCon>
        <LogoCon>
          <Link to="/">
            <NavP>Florence Devereux</NavP>
          </Link>
        </LogoCon>
        <IndexCon>
          <Link to="/project_index">
            <NavP>Index</NavP>
          </Link>
        </IndexCon>
        <AboutCon>
          <Link to="/about">
            <NavP>About</NavP>
          </Link>
        </AboutCon>
      </NavCon>
    </>
  );
};
