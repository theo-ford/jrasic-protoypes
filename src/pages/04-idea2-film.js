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

import Video1 from "../img/01_portrait.mp4";
import Video2 from "../img/02_portrait.mp4";
import Video3 from "../img/03_portrait.mp4";

const PageCon = styled.div`
  height: 100vh;
  width: 100vw;
  /* background-color: red; */
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

  /* background-color: blue; */

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  /* grid-column-gap: 14px; */
  /* margin-left: 14px; */
  grid-row-gap: 0;
  width: calc(100%);

  z-index: -1;
`;

const handlePosition = columnProp => {
  switch (columnProp) {
    case 1:
      return "1 / span 4";
    case 2:
      return "2 / span 4";
    case 3:
      return "3 / span 4";
    case 4:
      return "4 / span 4";
    case 5:
      return "5 / span 4";
    case 6:
      return "6 / span 4";
    case 7:
      return "7 / span 4";
    case 8:
      return "8 / span 4";
    case 9:
      return "9 / span 4";
    case 10:
      return "10 / span 4";
    case 11:
      return "11 / span 4";
    case 12:
      return "12 / span 4";
    case 13:
      return "13 / span 4";
  }
};

const handleActive = activeProp => {
  if (activeProp) {
  }
};
const ImgCon = styled.div`
  grid-column: ${({ columnProp }) => handlePosition(columnProp)};
  /* margin-left: 14px; */
  display: none;
  height: 75vh;
  /* background-color: red; */
  /* opacity: 0; */

  transition: opacity 0.4s ease;
  ${({ activeProp }) =>
    activeProp &&
    `
    display: block;  
  `}
`;

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
25% { 
  -webkit-filter: blur(0px);
  opacity: 1
}
75% { 
  -webkit-filter: blur(0px);
  opacity: 1
}
100% { 
  -webkit-filter: blur(30px);
  opacity: 0
}
`;
const ImgTest = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* animation-name: ${blur_in};
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-timing-function: ease; */
  ${({ activeProp }) =>
    activeProp &&
    `
  `}
`;

const Video = styled.video`
  /* width: 100%;
  height: 100%;
  object-fit: cover; */

  /* width: 200px;
  height: auto;
  position: relative;
  float: left; */

  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Index = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // const increaseCounter = useRef();

  // function handleCounterIncrease() {
  //   setActiveIndex(prevState => prevState + 1);
  // }

  // useEffect(() => {
  //   console.log(activeIndex);
  //   if (activeIndex >= 10) {
  //     // clearInterval(increaseCounter.current);
  //     setActiveIndex(0);
  //   }
  // }, [activeIndex]);

  // useEffect(() => {
  //   increaseCounter.current = setInterval(handleCounterIncrease, 5000);

  //   return () => clearInterval(increaseCounter.current);
  // }, []);

  const activeIndexFunction = (e, index) => {
    e.persist();
    // console.log(e);
    // console.log(index);
    setActiveIndex(index);
  };

  const numbers = numbersArray.map(index => {
    // console.log(index);
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

    // console.log(index.id);
    // console.log(activeIndex);

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
      video: Video1,
      column: 13,
    },
    {
      id: 1,
      video: Video2,
      column: 2,
    },
    {
      id: 2,
      video: Video3,
      column: 6,
    },
    {
      id: 3,
      video: Video1,
      column: 1,
    },
    {
      id: 4,
      video: Video2,
      column: 7,
    },
    {
      id: 5,
      video: Video3,
      column: 5,
    },
    {
      id: 6,
      video: Video1,
      column: 3,
    },
    {
      id: 7,
      video: Video2,
      column: 9,
    },
    {
      id: 8,
      video: Video3,
      column: 2,
    },
    {
      id: 9,
      video: Video1,
      column: 11,
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
        <ImgCon columnProp={index.column} activeProp={imgState}>
          <Video muted loop autoPlay playsInline ref={videoRef}>
            <source type="video/mp4" src={index.video}></source>
          </Video>
        </ImgCon>
      </>
    );
  });

  const VideoSingle = () => {
    const singleVideoRef = useRef(null);

    // useEffect(() => {
    //   console.log('testing')
    //   // singleVideoRef.current.load();
    //   // singleVideoRef.current.play();
    // }, []);

    // useEffect(() => {
    //   console.log("testing");
    //   // singleVideoRef.current.load();
    //   // singleVideoRef.current.play();
    // }, []);

    return (
      <>
        <Video muted loop autoPlay playsInline ref={singleVideoRef}>
          <source type="video/mp4" src={Video1}></source>
        </Video>
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>04-idea2-film</title>
      </Helmet>

      <PageCon>
        <LogoCon>
          <img src={logo}></img>
        </LogoCon>
        {/* <VideoSingle></VideoSingle> */}
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
