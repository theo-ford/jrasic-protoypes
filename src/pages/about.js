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
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";
// import Icon from "../../assets/White Logo No TF.svg";
import { useOnScreen } from "../components/hooks/useOnScreen";

import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import { Nav } from "../components/tf/nav";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: #af9880;
  }
  body {
    background-color: #af9880;    
  }
`;

const HeroConCon = styled.div`
  top: 0;
  height: 100vh;
  width: 100%;
  padding-top: 10px;
  background-color: #af9880;
  position: relative;

  p {
    color: white;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 24px;
    line-height: 115%;
  }
  @media (max-width: 640px) {
    height: auto;
    width: 100vw;
    p {
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 340;
      font-size: 18px;
      letter-spacing: -0.1px;
      line-height: 115%;
    }
  }
`;

const HeroConOne = styled.div`
  width: calc(100vw - 20px);
  margin-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  grid-gap: 10px;
  position: relative;
`;

const IntroCon = styled.div`
  grid-column: 9 / span 8;
  font-size: 60px;
  line-height: 110%;
  font-size: 24px;
  p {
    margin-bottom: 15px;
  }
  @media (max-width: 1024px) {
    margin-top: 50px;
    grid-column: span 16;
  }
`;

const HeroConTwo = styled.div`
  width: calc(100vw - 20px);
  position: absolute;
  bottom: 10px;

  margin-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  grid-gap: 10px;

  position: absolute;
  bottom: 15px;

  @media (max-width: 1024px) {
    grid-gap: 10px;
    position: relative;
    height: auto;
    letter-spacing: 0.1px;
    margin-top: 80px;

    margin-bottom: 40px;
  }
`;
const ContactCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 16;
    line-height: 110%;
  }
`;
const AddressCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 8;
    line-height: 110%;
  }
`;
const SocialsCon = styled.div`
  grid-column: span 2;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 8;
    line-height: 110%;
  }
`;
const UpdateCon = styled.div`
  grid-column: span 2;
  line-height: 110%;
  @media (max-width: 1024px) {
    display: none;
  }
`;
const BusinessInfoCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 16;
    margin-top: 10px;
    .info-title {
      display: none;
    }
  }
`;
const PSixteen = styled.div`
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    font-size: 16px;
    letter-spacing: -0.1px;
    line-height: 115%;
  }
  @media (max-width: 640px) {
    p {
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 290;
      font-size: 12px;
      letter-spacing: -0.1px;
      line-height: 115%;
    }
  }
`;
const PTwentyFour = styled.div`
  p,
  a {
    color: white;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 24px;
    line-height: 115%;
    margin-top: 6px;
  }
  @media (max-width: 640px) {
    p,
    a {
      font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
      font-variation-settings: "wght" 340;
      font-size: 18px;
      letter-spacing: -0.1px;
      line-height: 115%;
    }
  }
`;
const PTwelve = styled.div`
  p,
  a {
    font-size: 12px;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    line-height: 110%;
  }
  a {
    text-decoration: underline;
  }
`;

const About = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>Florence Devereux – About</title>
      </Helmet>
      <GlobalStyle></GlobalStyle>
      <Nav />
      <HeroConCon>
        <HeroConOne>
          <IntroCon>
            <div
              dangerouslySetInnerHTML={{
                __html: data.prismicAbout.data.about.html,
              }}
            />
          </IntroCon>
        </HeroConOne>
        <HeroConTwo>
          <ContactCon>
            <PSixteen>
              <p>Contact</p>
            </PSixteen>
            <PTwentyFour>
              <p>
                {data.prismicAbout.data.email.text}
                <br></br>
                {data.prismicAbout.data.phone_number.text}
              </p>
            </PTwentyFour>
          </ContactCon>
          <AddressCon>
            <PSixteen>
              <p>Address</p>
            </PSixteen>
            <PTwentyFour>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.prismicAbout.data.address.html,
                }}
              />
            </PTwentyFour>
          </AddressCon>
          <SocialsCon>
            <PSixteen>
              <p>Socials</p>
            </PSixteen>
            <PTwentyFour>
              <p>
                <Link to={data.prismicAbout.data.instagram.url}>Instagram</Link>
                <br></br>
                <Link to={data.prismicAbout.data.twitter.url}>Twitter</Link>
              </p>
            </PTwentyFour>
          </SocialsCon>
          <UpdateCon>
            <PSixteen>
              <p>Update</p>
            </PSixteen>
            <PTwentyFour>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.prismicAbout.data.date_time.html,
                }}
              />
            </PTwentyFour>
          </UpdateCon>
          <BusinessInfoCon>
            <PSixteen>
              <p class="info-title">Information</p>
            </PSixteen>
            <PTwelve>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.prismicAbout.data.business_information.html,
                }}
              />
            </PTwelve>
          </BusinessInfoCon>
        </HeroConTwo>
      </HeroConCon>
    </>
  );
};

export default withPrismicPreview(About);

export const query = graphql`
  query About {
    prismicAbout {
      data {
        about {
          text
          html
        }
        address {
          html
          text
        }
        business_information {
          html
          text
        }
        date_time {
          html
          text
        }
        email {
          html
          text
        }
        instagram {
          url
        }
        phone_number {
          html
          text
        }
        twitter {
          url
        }
      }
    }
  }
`;
