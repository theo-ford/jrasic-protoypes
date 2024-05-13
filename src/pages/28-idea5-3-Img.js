import React, { useRef, useState, useEffect, useMemo } from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";

import { useOnScreen } from "../components/hooks/useOnScreen";
import logo from "../img/logo.svg";

import image1portrait from "../img/01_portrait.jpg";
import image2portrait from "../img/02_portrait.jpg";
import image3portrait from "../img/03_portrait.jpg";

import image1landscape from "../img/01_landscape.jpg";
import image2landscape from "../img/02_landscape.jpg";
import image3landscape from "../img/03_landscape.jpg";

import image1square from "../img/01_square.jpg";
import image2square from "../img/02_square.jpg";
// import image3square from "../img/03_square.jpg";

import Video1Portrait from "../img/01_portrait.mp4";
import Video2Portrait from "../img/02_portrait.mp4";
import Video3Portrait from "../img/03_portrait.mp4";

import Video1Landscape from "../img/01_landscape.mp4";
import Video2Landscape from "../img/02_landscape.mp4";
import Video3Landscape from "../img/03_landscape.mp4";

import Video1Square from "../img/01_square.mp4";
import Video2Square from "../img/02_square.mp4";
import Video3Square from "../img/03_square.mp4";

const PageCon = styled.div`
  height: 100vh;
  width: 100vw;
  /* background-color: red; */
  position: absolute;
  overflow: hidden;
`;
const LogoCon = styled.div`
  position: fixed;
  width: 175px;
  top: 14px;
  left: 14px;
  img {
    width: 100%;
  }
`;
const TextCon = styled.div`
  position: absolute;
  bottom: 14px;

  /* background-color: blue; */

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 14px;
  margin-left: 14px;
  grid-row-gap: 0;
  width: calc(100% - 28px);

  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 420;
    font-size: 12px;
    color: black;
    line-height: 115%;
  }
`;

const AboutCon = styled.div`
  grid-column: span 4;
`;
const ClientsCon = styled.div`
  grid-column: span 4;
`;
const ContactCon = styled.div`
  grid-column: span 1;
`;
const StudioCon = styled.div`
  grid-column: 15 / span 1;
`;
const FarmCon = styled.div`
  grid-column: 16 / span 1;
`;
const NumberConCon = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  position: absolute;
  /* background-color: white; */
  align-items: center;
  justify-content: center;
`;
const NumberCon = styled.div`
  /* width: 400px;
  height: 200px; */
  /* background-color: grey; */
  display: grid;
  align-items: center;
  justify-content: center;
`;

const AllNumbers = styled.p`
  font-variation-settings: "wght" 420;
  font-size: 48px;
  color: black;
  margin: 0;
  padding: 0;
`;

const NumberSpan = styled.span`
  padding-left: 4px;
  padding-right: 4px;
  cursor: pointer;
`;

const ImgsCon = styled.div`
  position: absolute;
  width: 100vh;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-row-gap: 0;
  width: calc(100%);
  z-index: -1;
`;

const handlePosition = columnProp => {
  switch (columnProp) {
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "10";
    case 11:
      return "11";
    case 12:
      return "12";
    case 13:
      return "13";
  }
};

const handleOrientation = orientationProp => {
  switch (orientationProp) {
    case "landscape":
      return "span 16";
    case "portrait":
      return "span 5";
    case "square":
      return "span 8";
  }
};

const ImgCon = styled.div`
  grid-column: ${({ columnProp }) => handlePosition(columnProp)} /
    ${({ orientationProp }) => handleOrientation(orientationProp)};
  display: none;
  height: 100vh;
  transition: opacity 0.4s ease;
  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Index = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const activeIndexFunction = (e, index) => {
    e.persist();
    setActiveIndex(index);
  };

  const numbers = numbersArray.map(index => {
    if (index === activeIndex) {
      return (
        <NumberSpan onClick={e => activeIndexFunction(e, index)}>
          [{index}]
        </NumberSpan>
      );
    } else {
      return (
        <NumberSpan onClick={e => activeIndexFunction(e, index)}>
          {index}
        </NumberSpan>
      );
    }
  });

  const videoArray = [
    {
      id: 0,
      video: image1square,
      orientation: "square",
      column: 1,
    },
    {
      id: 1,
      video: image2square,
      orientation: "square",
      column: 9,
    },
    {
      id: 2,
      video: image3landscape,
      orientation: "square",
      column: 1,
    },
    {
      id: 3,
      video: image1square,
      orientation: "square",
      column: 9,
    },
    {
      id: 4,
      video: image2square,
      orientation: "square",
      column: 1,
    },
    {
      id: 5,
      video: image1square,
      orientation: "square",
      column: 9,
    },
    {
      id: 6,
      video: image2square,
      orientation: "square",
      column: 1,
    },
    {
      id: 7,
      video: image3landscape,
      orientation: "square",
      column: 9,
    },
    {
      id: 8,
      video: image1square,
      orientation: "square",
      column: 1,
    },
    {
      id: 9,
      video: image2square,
      orientation: "square",
      column: 9,
    },
  ];

  const videos = videoArray.map(index => {
    const [imgState, setImgState] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (activeIndex === index.id) {
        setImgState(true);
        // singleVideoRef.current.load();
        // singleVideoRef.current.play();
      } else {
        setImgState(false);
      }
    }, [activeIndex]);

    return (
      <>
        <ImgCon
          columnProp={index.column}
          activeProp={imgState}
          orientationProp={index.orientation}
        >
          <img src={index.video} />
          {/* <Video muted loop autoPlay playsInline ref={videoRef}>
            <source type="video/mp4" src={index.video}></source>
          </Video> */}
        </ImgCon>
      </>
    );
  });

  return (
    <>
      <Helmet>
        <title>16-idea5-3</title>
      </Helmet>

      <PageCon>
        <LogoCon>
          <img src={logo}></img>
        </LogoCon>
        <NumberConCon>
          <NumberCon>
            <AllNumbers>{numbers}</AllNumbers>
          </NumberCon>
        </NumberConCon>
        <TextCon>
          <AboutCon>
            <p>
              Jrasic is floral design studio founded by Jessie Booth, serving
              clients from across the fashion, events and hospitality industry.
              Based between London and Dorset, much of our produce is grown
              sustainably on our farm.
            </p>
          </AboutCon>
          <ClientsCon>
            <p>
              Select Clients: Aesop, Acne, Beyonce, Burberry, Cartier, Clame
              Clientielle, Chanel, Cornell Windlin, Dazed, Elle, Huntington
              Gardens, Little Form Inc, Lowe, Oscar Neurath, Otl Aicher,
              Self-Portrait, Skims.
            </p>
          </ClientsCon>
          <ContactCon>
            <p>info@jrasic.com @jrasic 0208 8756 6342</p>
          </ContactCon>
          <StudioCon>
            <p>
              studio<br></br>
              128 latona road london se15 6ag
            </p>
          </StudioCon>
          <FarmCon>
            <p>
              farm <br></br>
              127 dorset way dorset tw7 6ga
            </p>
          </FarmCon>
        </TextCon>
        <ImgsCon>{videos}</ImgsCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Index);

// export const query = graphql``;
