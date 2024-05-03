import React, { useEffect, useState, useRef } from "react";
import { graphql, Link } from "gatsby";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { Helmet } from "react-helmet";
import { ImageOrientation } from "../components/utils/image-orientation";
import styled, { createGlobalStyle } from "styled-components";
import { useMediaQuery } from "../components/tf/media-query";
import Icon from "../../assets/WhiteLogo.svg";

import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { NavWhite } from "../components/tf/nav-white";

const PageCon = styled.div`
  margin-bottom: 100px;
  display: block;
  float: left;
  position: relative;
  margin-top: 10px;
`;
const ProjectCon = styled.div`
  width: calc(100vw - 20px);
  margin-left: 10px;
  float: left;
  display: block;
  position: relative;
`;
const ProjectInfoCon = styled.div`
  display: block;
  width: calc(50% - 20px);
  float: left;
  margin-left: calc(50%);
  top: 10px;
  z-index: 20000;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 24px;
    margin-bottom: 15px;
    line-height: 115%;
    color: #af9880;
  }
  @media (max-width: 640px) {
    margin-top: 40px;
    display: block;
    width: calc(100%);
    float: left;
    margin-left: 0;
    top: 10px;
    z-index: 20000;
    p {
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 340;
      font-size: 18px;
      letter-spacing: -0.1px;
      line-height: 115%;
    }
  }
`;
const PSmall = styled.div`
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    font-size: 16px;
    letter-spacing: -0.1px;
    line-height: 100%;

    margin-top: 16px;
  }
`;
const ImgsCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  grid-gap: 10px;
  margin-top: 60px;
  margin-bottom: 40px;
  float: left;
`;
const ImgCaptionCon = styled.div`
  /* border: 1px solid #af9880; */
  padding-top: 5px;
  padding-bottom: 20px;
  p {
    font-size: 12px;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    color: #af9880;
    font-variation-settings: "wght" 290;
    letter-spacing: -0.1px;
    line-height: 110%;
  }
`;

const handleWidth = widthPass => {
  switch (widthPass) {
    case "9":
      return "span 9";
    case "8":
      return "span 8";
    case "7":
      return "span 7";
    case "6":
      return "span 6";
    case "5":
      return "span 5";
    case "4":
      return "span 4";
  }
};

const ImageSize = styled.div`
  grid-column: ${({ widthPass }) => handleWidth(widthPass)};
  position: relative;
  /* img {
    width: 100%;
    display: block;
    height: auto;
    z-index: 500;
  } */
  @media (max-width: 640px) {
    grid-column: span 16;
  }
`;

const Project = ({ data }) => {
  const imgs = data.prismicProject.data.project_page_images.map(
    (content_two, index) => {
      const img = getImage(content_two.image);
      console.log(content_two.image_size);
      return (
        <>
          <ImageSize widthPass={content_two.image_size}>
            <GatsbyImage image={img} />
            <ImgCaptionCon>
              <p>{content_two.image_caption.text}</p>
            </ImgCaptionCon>
          </ImageSize>
        </>
      );
    }
  );
  return (
    <>
      <Helmet>
        <title>
          Florence Devereux - {data.prismicProject.data.project_title.text}
        </title>
      </Helmet>
      <NavWhite />
      <PageCon>
        <ProjectCon>
          <ProjectInfoCon>
            <p>Project: {data.prismicProject.data.project_title.text} </p>
            <div
              dangerouslySetInnerHTML={{
                __html: data.prismicProject.data.project_about.html,
              }}
            />
            <PSmall>
              <p>
                Year: {data.prismicProject.data.year.text}
                <br></br>
                Location: {data.prismicProject.data.location.text}
                <br></br>
                Type: {data.prismicProject.data.project_type.text}
                <br></br>
              </p>
            </PSmall>
          </ProjectInfoCon>
          <ImgsCon>{imgs}</ImgsCon>
        </ProjectCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Project);

export const query = graphql`
  query ProjectPage($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      data {
        location {
          html
          text
        }
        project_about {
          html
          text
        }
        project_page_images {
          image {
            gatsbyImageData
          }
          image_caption {
            html
            text
          }
          image_size
        }
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
      }
    }
  }
`;
