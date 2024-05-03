import React, { useRef, useState, useEffect, useMemo } from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";

import { useOnScreen } from "../components/hooks/useOnScreen";

const PageCon = styled.div`
  height: 100vh;
  width: 100vw;
  /* background-color: red; */
  position: absolute;
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
    color: white;
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
  background-color: black;
  align-items: center;
  justify-content: center;
`;
const NumberCon = styled.div`
  width: 400px;
  height: 200px;
  background-color: white;
`;

const Index = ({ data }) => {
  return (
    <>
      <Helmet>
        <title>01-idea2-black</title>
      </Helmet>
      <PageCon>
        <NumberConCon>
          <NumberCon></NumberCon>
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
      </PageCon>
    </>
  );
};

export default withPrismicPreview(Index);

// export const query = graphql``;
