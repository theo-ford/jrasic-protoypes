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
  height: 100vh;
  width: 100vw;
  position: absolute;
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
  grid-column: span 2;
`;
const NumberCon = styled.div`
  grid-column: span 2;
`;
const StudioCon = styled.div`
  grid-column: 15 / span 1;
`;
const FarmCon = styled.div`
  grid-column: 16 / span 1;
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
  position: absolute;
  height: calc(75vh - 14px);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 14px;
  margin-left: 14px;
  margin-top: 14px;
  grid-row-gap: 0;
  width: calc(100% - 28px);
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
      return "span 8";
    case "portrait":
      return "span 4";
    case "square":
      return "span 5";
  }
};

const ImgConCon = styled.div`
  grid-column: ${({ columnProp }) => handlePosition(columnProp)} /
    ${({ orientationProp }) => handleOrientation(orientationProp)};
  display: none;
  height: 100%;
  transition: opacity 0.4s ease;
  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
`;

const ImgCon = styled.div`
  bottom: 0;
  width: 100%;
  height: 100%;
  display: grid;
  align-items: end;
`;

const handlePortraitHeight = orientationProp => {
  switch (orientationProp) {
    case "landscape":
      return "auto";
    case "portrait":
      return "100%";
    case "square":
      return "auto";
  }
};

const Video = styled.video`
  width: 100%;
  /* width: 120%; */
  /* height: 120%; */
  /* height: 100%; */
  height: ${({ orientationProp }) => handlePortraitHeight(orientationProp)};
  /* height: 100%; */
  object-fit: cover;
`;

const ImgTest = styled.img`
  width: 120%;
  height: 120%;
  object-fit: cover;
  ${({ activeProp }) =>
    activeProp &&
    `
  `}
`;

const Index = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  const increaseCounter = useRef();

  function handleCounterIncrease() {
    setActiveIndex(prevState => prevState + 1);
  }

  // useEffect(() => {
  //   console.log(activeIndex);
  //   if (activeIndex >= 10) {
  //     // clearInterval(increaseCounter.current);
  //     setActiveIndex(0);
  //   }
  // }, [activeIndex]);

  // useEffect(() => {
  //   increaseCounter.current = setInterval(handleCounterIncrease, 3000);

  //   return () => clearInterval(increaseCounter.current);
  // }, []);

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

  const imgArray = [
    {
      id: 0,
      img: image1,
      column: 4,
    },
    {
      id: 1,
      img: image2,
      column: 8,
    },
    {
      id: 2,
      img: image3,
      column: 2,
    },
    {
      id: 3,
      img: image1,
      column: 6,
    },
    {
      id: 4,
      img: image2,
      column: 1,
    },
    {
      id: 5,
      img: image3,
      column: 13,
    },
    {
      id: 6,
      img: image1,
      column: 7,
    },
    {
      id: 7,
      img: image2,
      column: 10,
    },
    {
      id: 8,
      img: image3,
      column: 5,
    },
    {
      id: 9,
      img: image1,
      column: 9,
    },
  ];

  const imgs = imgArray.map(index => {
    const [imgState, setImgState] = useState(false);

    useEffect(() => {
      if (activeIndex === index.id) {
        setImgState(true);
      } else {
        setImgState(false);
      }
    }, [activeIndex]);

    return (
      <>
        <ImgCon columnProp={index.column} activeProp={imgState}>
          <ImgTest src={index.img} activeProp={imgState}></ImgTest>
        </ImgCon>
      </>
    );
  });

  const videoArray = [
    {
      id: 0,
      video: Video1Portrait,
      column: 13,
      orientation: "portrait",
    },
    {
      id: 1,
      video: Video2Square,
      column: 1,
      orientation: "square",
    },
    {
      id: 2,
      video: Video3Landscape,
      column: 9,
      orientation: "landscape",
    },
    {
      id: 3,
      video: Video1Square,
      column: 1,
      orientation: "square",
    },
    {
      id: 4,
      video: Video2Portrait,
      column: 7,
      orientation: "portrait",
    },
    {
      id: 5,
      video: Video3Landscape,
      column: 9,
      orientation: "landscape",
    },
    {
      id: 6,
      video: Video1Square,
      column: 1,
      orientation: "square",
    },
    {
      id: 7,
      video: Video2Portrait,
      column: 9,
      orientation: "portrait",
    },
    {
      id: 8,
      video: Video3Landscape,
      column: 1,
      orientation: "landscape",
    },
    {
      id: 9,
      video: Video1Square,
      column: 12,
      orientation: "square",
    },
  ];

  const videos = videoArray.map(index => {
    const [imgState, setImgState] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
      if (activeIndex === index.id) {
        setImgState(true);
      } else {
        setImgState(false);
      }
    }, [activeIndex]);

    return (
      <>
        <ImgConCon
          columnProp={index.column}
          orientationProp={index.orientation}
          activeProp={imgState}
        >
          <ImgCon>
            <Video
              muted
              loop
              autoPlay
              playsInline
              ref={videoRef}
              orientationProp={index.orientation}
            >
              <source type="video/mp4" src={index.video}></source>
            </Video>
          </ImgCon>
        </ImgConCon>
      </>
    );
  });

  return (
    <>
      <Helmet>
        <title>10-idea1-film</title>
      </Helmet>

      <PageCon>
        <LogoCon>
          <img src={logo}></img>
        </LogoCon>
        {/* <VideoSingle></VideoSingle> */}

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
            <p>
              info@jrasic.com<br></br> @jrasic<br></br> 0208 8756 6342
            </p>
          </ContactCon>
          <NumberCon>
            <AllNumbers>{numbers}</AllNumbers>
          </NumberCon>
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
        <ImgsCon>
          {videos}
          {/* {imgs} */}
          {/* <ImgCon columnProp={1} activeProp={false}>
            <StaticImage src={"../img/01.jpg"} />
          </ImgCon>
          <ImgCon columnProp={2} activeProp={false}>
            <StaticImage src={"../img/02.jpg"} />
          </ImgCon>
          <ImgCon columnProp={3} activeProp={false}>
            <StaticImage src={"../img/03.jpg"} />
          </ImgCon>
          <ImgCon columnProp={4} activeProp={false}>
            <StaticImage src={"../img/01.jpg"} />
          </ImgCon>
          <ImgCon columnProp={5} activeProp={false}>
            <StaticImage src={"../img/02.jpg"} />
          </ImgCon>
          <ImgCon columnProp={6} activeProp={false}>
            <StaticImage src={"../img/03.jpg"} />
          </ImgCon>
          <ImgCon columnProp={7} activeProp={false}>
            <StaticImage src={"../img/01.jpg"} />
          </ImgCon>
          <ImgCon columnProp={8} activeProp={false}>
            <StaticImage src={"../img/02.jpg"} />
          </ImgCon>
          <ImgCon columnProp={9} activeProp={true}>
            <StaticImage src={"../img/03.jpg"} />
          </ImgCon> */}
        </ImgsCon>
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Index);

// export const query = graphql``;
