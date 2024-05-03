import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  useMemo,
} from "react";
import ReactDOM, { findDOMNode } from "react-dom";
import { graphql, Link, useScrollRestoration } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "../components/tf/media-query";
import { Nav } from "../components/tf/nav";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #af9880;
  }
  body {
    background-color: #af9880;    
  }
`;

const PageCon = styled.div`
  top: 0;
  min-height: 100vh;
  width: 100%;
  padding-top: 10px;
  background-color: #af9880;
`;
const IndexTableCon = styled.div`
  width: calc(100% - 20px);
  margin-left: 10px;
  margin-top: 100px;
  border-bottom: 1px solid white;
`;

const ProjectCon = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;

  p {
    color: white;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 24px;
    letter-spacing: -0.1px;
    line-height: 115%;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;

    p {
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 340;
      font-size: 18px;
      letter-spacing: -0.1px;
      line-height: 140%;
      padding-left: 5px;
      margin: 0;
      padding: 0;
    }
  }
  :hover {
    background-color: white;
    p {
      color: #af9880;
    }
  }
`;
const TitleCon = styled.div`
  padding-left: 8px;
  grid-column: span 3;
  padding-top: 5px;
  padding-bottom: 7px;
  padding-right: 8px;
  @media (max-width: 666px) {
    grid-column: span 4;
    padding-bottom: 0px;
    padding-top: 0px;
    p {
      padding-top: -2px;
    }
  }
`;

const YearCon = styled.div`
  grid-column: span 1;
  padding-top: 6px;
  border-left: 1px solid white;
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: 1024px) {
    grid-column: span 2;
    padding-top: 0px;
    p {
      font-size: 12px;
      padding-top: 6px;
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 290;
      letter-spacing: -0.1px;
      line-height: 110%;
    }
  }
`;

const LocationCon = styled.div`
  grid-column: span 2;
  padding-top: 6px;
  border-left: 1px solid white;
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const ServicesCon = styled.div`
  grid-column: span 3;
  padding-top: 6px;
  border-left: 1px solid white;
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: 1024px) {
    grid-column: span 2;
    padding-top: 0px;
    p {
      font-size: 12px;
      padding-top: 6px;
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 290;
      letter-spacing: -0.1px;
      line-height: 110%;
    }
  }
`;

const DescriptionCon = styled.div`
  grid-column: span 7;
  padding-top: 4px;
  border-left: 1px solid white;
  padding-left: 8px;
  padding-right: 8px;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    font-size: 16px;
    letter-spacing: -0.1px;
    line-height: 115%;

    padding-top: 6px;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;
const ProjectConHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  border-top: 1px solid white;
  border-left: 1px solid white;
  border-right: 1px solid white;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    font-size: 16px;
    letter-spacing: -0.1px;
    line-height: 115%;
    color: white;
    padding-top: 6px;
  }
  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
    p {
      /* font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 340;
      font-size: 18px;
      letter-spacing: -0.1px;
      line-height: 140%;
      padding-left: 5px;
      margin: 0;
      padding: 0; */

      font-size: 12px;
      /* padding-top: 6px; */
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 290;
      letter-spacing: -0.1px;
      line-height: 140%;
    }
    ${TitleCon} {
      p {
        line-height: 110%;
      }
    }
  }
`;
const ProjectIndex = ({ data }) => {
  const Project = ({ content }) => {
    return (
      <>
        <Link to={`/${content.node.uid}`}>
          <ProjectCon>
            <TitleCon>
              <p>{content.node.data.project_title.text}</p>
            </TitleCon>
            <YearCon>
              <p>{content.node.data.year.text}</p>
            </YearCon>
            <LocationCon>
              <p>{content.node.data.location.text}</p>
            </LocationCon>
            <ServicesCon>
              <p>{content.node.data.project_type.text}</p>
            </ServicesCon>
            <DescriptionCon>
              <p>{content.node.data.homepage_intro.text}</p>
            </DescriptionCon>
          </ProjectCon>
        </Link>
      </>
    );
  };
  const index = data.allPrismicProject.edges.map((content, index) => {
    return <Project content={content} />;
  });
  return (
    <>
      <Helmet>
        <title>Florence Devereux - Index</title>
      </Helmet>
      <GlobalStyle></GlobalStyle>
      <Nav />
      <PageCon>
        <IndexTableCon>
          <ProjectConHeader>
            <TitleCon>
              <p>Project</p>
            </TitleCon>
            <YearCon>
              <p>Year</p>
            </YearCon>
            <LocationCon>
              <p>Location</p>
            </LocationCon>
            <ServicesCon>
              <p>Role</p>
            </ServicesCon>
            <DescriptionCon>
              <p>Description</p>
            </DescriptionCon>
          </ProjectConHeader>
          {index}
        </IndexTableCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(ProjectIndex);

export const query = graphql`
  query ProjectIndex {
    allPrismicProject(sort: { fields: data___year___text, order: DESC }) {
      edges {
        node {
          uid
          data {
            project_title {
              html
              text
            }
            project_type {
              html
              text
            }
            year {
              html
              text
            }
            location {
              html
              text
            }
            homepage_intro {
              html
              text
            }
          }
        }
      }
    }
  }
`;
