import React, { useRef, useState, useEffect, useMemo } from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";
import Div100vh from "react-div-100vh";

import { useOnScreen } from "../components/hooks/useOnScreen";
import logo from "../img/logo.svg";

import image1 from "../img/01_portrait.jpg";
import image2 from "../img/02_portrait.jpg";
import image3 from "../img/03_portrait.jpg";

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
  height: 100%;
  width: 100vw;
  /* background-color: red; */
  position: absolute;
  overflow: hidden;
`;
const LogoCon = styled.div`
  position: fixed;
  width: 120px;
  top: 14px;
  left: 14px;
  img {
    width: 100%;
  }
  display: block;
  ${({ activeAboutProp }) =>
    activeAboutProp &&
    `
    display: none;  
  `};
`;
const TextCon = styled.div`
  position: absolute;
  top: 14px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 14px;
  margin-left: 14px;
  grid-row-gap: 0;
  width: calc(100% - 28px);
  display: none;

  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 420;
    font-size: 12px;
    color: black;
    line-height: 115%;
  }
  ${({ activeAboutProp }) =>
    activeAboutProp &&
    `
    display: grid;  
  `}
`;

const AboutCon = styled.div`
  grid-column: span 16;
  margin-bottom: 10px;
`;
const ClientsCon = styled.div`
  grid-column: span 16;
  margin-bottom: 10px;
`;
const ContactCon = styled.div`
  grid-column: span 16;
  margin-bottom: 10px;
`;

const StudioCon = styled.div`
  grid-column: span 5;
`;
const FarmCon = styled.div`
  grid-column: span 8;
`;
const MetaCon = styled.div`
  margin-top: 20px;
  grid-column: span 16;
  p {
    font-size: 9px;
  }
`;

const NumberCon = styled.div`
  grid-column: span 8;
`;
const AllNumbers = styled.p`
  font-variation-settings: "wght" 600;
`;

const NumberSpan = styled.span`
  padding-left: 2px;
  padding-right: 2px;
  cursor: pointer;
  font-variation-settings: "wght" 700;
`;
const ImgsCon = styled.div`
  position: relative;
  float: right;
  width: 125vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /*4*/ 1fr 1fr 1fr 1fr /*8*/ 1fr 1fr 1fr 1fr /*12*/ 1fr 1fr 1fr 1fr /*16*/ 1fr 1fr 1fr 1fr /*20*/;
  grid-row-gap: 0;
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
    case 14:
      return "14";
    case 15:
      return "15";
    case 16:
      return "16";
    case 17:
      return "17";
    case 18:
      return "18";
    case 20:
      return "20";
    case 21:
      return "21";
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
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MobileFooterCon = styled.div`
  position: absolute;
  bottom: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 14px;
  margin-left: 14px;
  grid-row-gap: 0;
  width: calc(100% - 28px);
  p {
    font-size: 12px;
  }
`;
const InfoButtonCon = styled.div`
  grid-column: 12 / span 4;
`;

const Index = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeAbout, setActiveAbout] = useState(false);

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
      video: Video2Square,
      orientation: "square",
      column: 5,
    },
    {
      id: 1,
      video: Video3Landscape,
      orientation: "landscape",
      column: 9,
    },
    {
      id: 2,
      video: Video1Portrait,
      orientation: "portrait",
      column: 5,
    },
    {
      id: 3,
      video: Video1Square,
      orientation: "square",
      column: 13,
    },
    {
      id: 4,
      video: Video2Landscape,
      orientation: "landscape",
      column: 1,
    },
    {
      id: 5,
      video: Video2Portrait,
      orientation: "portrait",
      column: 16,
    },
    {
      id: 6,
      video: Video3Landscape,
      orientation: "landscape",
      column: 9,
    },
    {
      id: 7,
      video: Video1Square,
      orientation: "square",
      column: 5,
    },
    {
      id: 8,
      video: Video3Portrait,
      orientation: "portrait",
      column: 5,
    },
    {
      id: 9,
      video: Video1Square,
      orientation: "square",
      column: 13,
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
          <Video muted loop autoPlay playsInline ref={videoRef}>
            <source type="video/mp4" src={index.video}></source>
          </Video>
        </ImgCon>
      </>
    );
  });

  const activeAboutFunc = (e, index) => {
    e.persist();

    if (!activeAbout) {
      setActiveAbout(true);
    } else {
      setActiveAbout(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>22-idea5-2-altType-mobile</title>
      </Helmet>
      <Div100vh>
        <PageCon>
          <LogoCon activeAboutProp={activeAbout}>
            <img src={logo}></img>
          </LogoCon>
          <MobileFooterCon>
            <NumberCon>
              <AllNumbers>{numbers}</AllNumbers>
            </NumberCon>
            <InfoButtonCon onClick={activeAboutFunc}>
              <p>[info]</p>
            </InfoButtonCon>
          </MobileFooterCon>

          <TextCon activeAboutProp={activeAbout}>
            <AboutCon>
              <p>
                Jrasic is floral design studio founded by Jessie Booth, serving
                clients from across the fashion, events and hospitality
                industry. Based between London and Dorset, much of our produce
                is grown sustainably on our farm.
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
              <p>
                info@jrasic.com<br></br> @jrasic<br></br> 0208 8756 6342
              </p>
            </ContactCon>

            <StudioCon>
              <p>
                studio<br></br>
                128 latona road<br></br> london se15 6ag
              </p>
            </StudioCon>
            <FarmCon>
              <p>
                farm <br></br>
                127 dorset way<br></br> dorset tw7 6ga
              </p>
            </FarmCon>
            <MetaCon>
              <p>
                logo designed by margot leveque. art-direction, site design &
                development by theo ford. videography by fredie taylor. set
                design by dasie azis.
              </p>
            </MetaCon>
          </TextCon>
          <ImgsCon>{videos}</ImgsCon>
        </PageCon>
      </Div100vh>
    </>
  );
};

export default withPrismicPreview(Index);

// export const query = graphql``;
