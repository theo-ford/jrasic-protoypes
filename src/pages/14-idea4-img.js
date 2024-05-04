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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /*4*/ 1fr 1fr 1fr 1fr /*8*/ 1fr 1fr 1fr 1fr /*12*/ 1fr 1fr 1fr 1fr /*16*/ 1fr 1fr 1fr 1fr /*20*/ 1fr 1fr 1fr 1fr /*24*/ 1fr 1fr 1fr 1fr /*28*/ 1fr 1fr 1fr 1fr /*32*/;
  grid-template-rows: 1fr 1fr 1fr 1fr /*4*/ 1fr 1fr 1fr 1fr /*8*/ 1fr 1fr 1fr 1fr /*12*/ 1fr 1fr 1fr 1fr /*16*/ 1fr 1fr 1fr 1fr /*20*/;
  width: 100vw;
  height: 100vh;
`;
const ImgConSquare = styled.div`
  grid-column: 24 / span 9;
  grid-row-start: 5;
  grid-row: 5 / span 6;
  aspect-ratio: 1;
`;

const GridHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /*4*/ 1fr 1fr 1fr 1fr /*8*/ 1fr 1fr 1fr 1fr /*12*/ 1fr 1fr 1fr 1fr /*16*/ 1fr 1fr 1fr 1fr /*20*/ 1fr 1fr 1fr 1fr /*24*/ 1fr 1fr 1fr 1fr /*28*/ 1fr 1fr 1fr 1fr /*32*/;
  width: 100vw;
  position: absolute;
  top: 0;
  margin-top: 11px;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 420;
    font-size: 12px;
    color: black;
    line-height: 115%;
  }
`;
const LogoCon = styled.div`
  grid-column: span 3;
  margin-left: 11px;

  width: calc(100% - 11px);
`;
const ContactCon = styled.div`
  grid-column: 20 / span 3;
`;
const StudioCon = styled.div`
  grid-column: 28 / span 3;
`;
const FarmCon = styled.div`
  grid-column: 31 / span 3;
`;
const GridFoot = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /*4*/ 1fr 1fr 1fr 1fr /*8*/ 1fr 1fr 1fr 1fr /*12*/ 1fr 1fr 1fr 1fr /*16*/ 1fr 1fr 1fr 1fr /*20*/ 1fr 1fr 1fr 1fr /*24*/ 1fr 1fr 1fr 1fr /*28*/ 1fr 1fr 1fr 1fr /*32*/;
  width: 100vw;
  position: absolute;
  bottom: 0;
  margin-bottom: 11px;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 420;
    font-size: 12px;
    color: black;
    line-height: 115%;
  }
`;
const CreditsCon = styled.div`
  grid-column: span 6;
  margin-left: 11px;
  width: calc(100% - 11px);
`;
const NumberCon = styled.div`
  grid-column: 20 / span 3;
  p {
    font-size: 24px;
  }
`;
const AllNumbers = styled.p`
  font-variation-settings: "wght" 420;
`;

const NumberSpan = styled.span`
  padding-left: 2px;
  padding-right: 2px;
  cursor: pointer;
  font-variation-settings: "wght" 420;
`;

const handleVideoColumn = videoColumnProp => {
  switch (videoColumnProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
    case 21:
      return "21";
    case 22:
      return "22";
    case 23:
      return "23";
    case 24:
      return "24";
    case 25:
      return "25";
    case 26:
      return "26";
    case 27:
      return "27";
    case 28:
      return "28";
    case 29:
      return "29";
    case 29:
      return "29";
    case 30:
      return "30";
    case 31:
      return "31";
    case 32:
      return "32";
  }
};

const handleVideoRow = videoRowProp => {
  switch (videoRowProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
  }
};

const handleOrientationColumn = orientationProp => {
  switch (orientationProp) {
    case "landscape":
      return "span 12";
    case "portrait":
      return "span 6";
    case "square":
      return "span 8";
  }
};
const handleOrientationRow = orientationProp => {
  switch (orientationProp) {
    case "landscape":
      return "span 4";
    case "portrait":
      return "span 12";
    case "square":
      return "span 5";
  }
};

const fade_in = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const blur_in = keyframes`
0% { 
  -webkit-filter: blur(30px);
  opacity: 0;
}
12% { 
  -webkit-filter: blur(0px);
  opacity: 1
}
75% { 
  -webkit-filter: blur(0px);
  opacity: 1
}
88% { 
  -webkit-filter: blur(30px);
  opacity: 0
}
`;

const ImgConCon = styled.div`
  grid-column: ${({ videoColumnProp }) => handleVideoColumn(videoColumnProp)} /
    ${({ videoOrientationProp }) =>
      handleOrientationColumn(videoOrientationProp)};
  grid-row: ${({ videoRowProp }) => handleVideoRow(videoRowProp)} /
    ${({ videoOrientationProp }) => handleOrientationRow(videoOrientationProp)};
  display: none;
  height: 100%;
  transition: opacity 0.4s ease;

  animation-name: ${blur_in};
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
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
`;

const handleAboutTextColumn = aboutTextColumnProp => {
  switch (aboutTextColumnProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
    case 21:
      return "21";
    case 22:
      return "22";
    case 23:
      return "23";
    case 24:
      return "24";
    case 25:
      return "25";
    case 26:
      return "26";
    case 27:
      return "27";
    case 28:
      return "28";
    case 29:
      return "29";
    case 29:
      return "29";
    case 30:
      return "30";
    case 31:
      return "31";
    case 32:
      return "32";
  }
};

const handleAboutTextRow = aboutTextRowProp => {
  switch (aboutTextRowProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
  }
};
const AboutText = styled.div`
  /* grid-column: 3 / span 11;
  grid-row: 5 / span 3; */

  grid-column: ${({ aboutTextColumnProp }) =>
    handleAboutTextColumn(aboutTextColumnProp)} / span 11;
  grid-row: ${({ aboutTextRowProp }) => handleAboutTextRow(aboutTextRowProp)} /
    span 3;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 380;
    font-size: 22px;
    color: black;
    line-height: 118%;
    letter-spacing: -0.5px;
  }
  display: none;
  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
  animation-name: ${blur_in};
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
`;

const handleClientTextColumn = clientTextColumnProp => {
  switch (clientTextColumnProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
    case 21:
      return "21";
    case 22:
      return "22";
    case 23:
      return "23";
    case 24:
      return "24";
    case 25:
      return "25";
    case 26:
      return "26";
    case 27:
      return "27";
    case 28:
      return "28";
    case 29:
      return "29";
    case 29:
      return "29";
    case 30:
      return "30";
    case 31:
      return "31";
    case 32:
      return "32";
  }
};

const handleClientTextRow = clientTextRowProp => {
  switch (clientTextRowProp) {
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
    case 19:
      return "19";
    case 20:
      return "20";
  }
};

const ClientsText = styled.div`
  /* grid-column: 4 / span 8;
  grid-row: 16 / span 3; */

  grid-column: ${({ clientTextColumnProp }) =>
    handleAboutTextColumn(clientTextColumnProp)} / span 8;
  grid-row: ${({ clientTextRowProp }) =>
    handleAboutTextRow(clientTextRowProp)} /
    span 3;

  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 420;
    font-size: 12px;
    color: black;
    line-height: 115%;
  }
  display: none;
  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
  animation-name: ${blur_in};
  animation-duration: 10s;
  animation-fill-mode: forwards;
  animation-timing-function: ease;
`;
const Index = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const increaseCounter = useRef();

  function handleCounterIncrease() {
    setActiveIndex(prevState => prevState + 1);
  }

  useEffect(() => {
    console.log(activeIndex);
    if (activeIndex >= 10) {
      // clearInterval(increaseCounter.current);
      setActiveIndex(0);
    }
  }, [activeIndex]);

  useEffect(() => {
    increaseCounter.current = setInterval(handleCounterIncrease, 8000);

    return () => clearInterval(increaseCounter.current);
  }, []);

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

  const movingContentArray = [
    {
      id: 0,
      video: image1portrait,
      orientation: "portrait",
      video_column: 13,
      video_row: 10,
      about_text_column: 10,
      about_text_row: 5,
      client_text_column: 12,
      client_text_row: 13,
    },
    {
      id: 1,
      video: image2square,
      orientation: "square",
      video_column: 18,
      video_row: 6,
      about_text_column: 4,
      about_text_row: 8,
      client_text_column: 17,
      client_text_row: 9,
    },
    {
      id: 2,
      video: image3landscape,
      orientation: "landscape",
      video_column: 1,
      video_row: 2,
      about_text_column: 12,
      about_text_row: 12,
      client_text_column: 18,
      client_text_row: 16,
    },
    {
      id: 3,
      video: image1square,
      orientation: "square",
      video_column: 9,
      video_row: 4,
      about_text_column: 12,
      about_text_row: 16,
      client_text_column: 19,
      client_text_row: 6,
    },
    {
      id: 4,
      video: image2portrait,
      orientation: "portrait",
      video_column: 8,
      video_row: 10,
      about_text_column: 7,
      about_text_row: 12,
      client_text_column: 20,
      client_text_row: 16,
    },
    {
      id: 5,
      video: image3landscape,
      orientation: "landscape",
      video_column: 1,
      video_row: 12,
      about_text_column: 4,
      about_text_row: 14,
      client_text_column: 8,
      client_text_row: 5,
    },
    {
      id: 6,
      video: image1square,
      orientation: "square",
      video_column: 7,
      video_row: 1,
      about_text_column: 22,
      about_text_row: 4,
      client_text_column: 12,
      client_text_row: 13,
    },
    {
      id: 7,
      video: image2portrait,
      orientation: "portrait",
      video_column: 13,
      video_row: 1,
      about_text_column: 8,
      about_text_row: 17,
      client_text_column: 9,
      client_text_row: 4,
    },
    {
      id: 8,
      video: image3landscape,
      orientation: "landscape",
      video_column: 12,
      video_row: 15,
      about_text_column: 6,
      about_text_row: 12,
      client_text_column: 15,
      client_text_row: 4,
    },
    {
      id: 9,
      video: image1square,
      orientation: "square",
      video_column: 15,
      video_row: 10,
      about_text_column: 6,
      about_text_row: 7,
      client_text_column: 2,
      client_text_row: 4,
    },
  ];

  const movingContent = movingContentArray.map(index => {
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
          videoColumnProp={index.video_column}
          videoRowProp={index.video_row}
          videoOrientationProp={index.orientation}
          activeProp={imgState}
        >
          <ImgCon>
            <img src={index.video} />
          </ImgCon>
        </ImgConCon>
        <AboutText
          aboutTextColumnProp={index.about_text_column}
          aboutTextRowProp={index.about_text_row}
          activeProp={imgState}
        >
          <p>
            Jrasic &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;is a floral design
            studio founded by Jessie Booth, serving clients from across the
            fashion, events and hospitality industry. Based between London and
            Dorset, much of our produce is grown sustainably on our farm.
          </p>
        </AboutText>
        <ClientsText
          clientTextColumnProp={index.client_text_column}
          clientTextRowProp={index.client_text_row}
          activeProp={imgState}
        >
          <p>
            Select Clients: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Aesop,
            Acne, Beyonce, Burberry, Cartier, Clame Clientielle, Chanel, Cornell
            Windlin, Dazed, Elle, Huntington Gardens, Little Form Inc, Lowe,
            Oscar Neurath, Otl Aicher, Self-Portrait, Skims, Tyler the Creator,
            Whistles, Wes Anderson, Vogue, Zara.
          </p>
        </ClientsText>
      </>
    );
  });

  return (
    <>
      <Helmet>
        <title>14-idea4-img</title>
      </Helmet>
      <GridHead>
        <LogoCon>
          <img src={logo}></img>
        </LogoCon>
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
            127 dorset way dorset tw7 6ga
          </p>
        </FarmCon>
      </GridHead>

      <Grid>{movingContent}</Grid>

      <GridFoot>
        <CreditsCon>
          <p>
            logo designed by margot leveque. <br></br>
            art-direction, site design & development by theo ford.
          </p>
        </CreditsCon>
        <NumberCon>
          <AllNumbers>{numbers}</AllNumbers>
        </NumberCon>
      </GridFoot>
    </>
  );
};

export default withPrismicPreview(Index);

// export const query = graphql``;
