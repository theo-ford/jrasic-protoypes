import React, { useRef, useState, useEffect, useMemo } from "react";
import { graphql, Link, useScrollRestoration } from "gatsby";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { withPrismicPreview } from "gatsby-plugin-prismic-previews";
import { ImageOrientation } from "../components/utils/image-orientation";
import { Helmet } from "react-helmet";
import "../components/styles/index.css";
import { useMediaQuery } from "../components/tf/media-query";
// import Scrollspy from "react-scrollspy";
// import ScrollSpy from "react-ui-scrollspy";
import { useOnScreen } from "../components/hooks/useOnScreen";

import { Nav } from "../components/tf/nav";
import { NavWhite } from "../components/tf/nav-white";

const GlobalStyle = createGlobalStyle`
  html {
    background-color: white;
    overflow-x: clip;
    max-width: 100vw;
  }
  body {
    // https://stackoverflow.com/questions/47095596/body-overflow-x-hidden-breaks-position-sticky
    background-color: white;
    overflow-x: clip;
    max-width: 100vw;
    @media (min-width: 666px) {
      /* position: fixed; */
    }    
  }
`;

const HeroConCon = styled.div`
  top: 0;
  height: 90vh;
  width: 100%;
  padding-top: 10px;
  background-color: #af9880;
  color: white;
  position: relative;
  p {
    color: white;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 24px;
    line-height: 115%;
  }
  @media (max-width: 640px) {
    height: 95vh;
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
  float: left;
`;

const IntroCon = styled.div`
  grid-column: 9 / span 8;
  font-size: 60px;
  line-height: 110%;
  font-size: 24px;
  @media (max-width: 640px) {
    margin-top: 50px;
    grid-column: span 16;
  }
`;

const HeroConTwo = styled.div`
  position: absolute;
  float: left;
  bottom: 15px;

  width: calc(100vw - 20px);
  margin-left: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  grid-gap: 10px;

  @media (max-width: 640px) {
    grid-gap: 10px;
    letter-spacing: 0.1px;
  }
`;
const ContactCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 8;
  }
  @media (max-width: 640px) {
    grid-column: span 16;
    line-height: 110%;
  }
`;
const AddressCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    grid-column: span 5;
  }
  @media (max-width: 640px) {
    grid-column: span 8;
    line-height: 110%;
  }
`;
const SocialsCon = styled.div`
  grid-column: span 2;
  line-height: 110%;
  @media (max-width: 640px) {
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
  @media (max-width: 640px) {
    display: none;
  }
`;
const BusinessInfoCon = styled.div`
  grid-column: span 4;
  line-height: 110%;
  @media (max-width: 1024px) {
    display: none;
  }
  @media (max-width: 640px) {
    display: none;
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

const ImgsCon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  grid-gap: 10px;
  margin-top: 60px;
  margin-bottom: 40px;
  float: left;
  height: auto;
  width: 100%;
`;

const handleWidth = widthPass => {
  switch (widthPass) {
    case "landscape 7":
      return "span 7";
    case "landscape 6":
      return "span 6";
    case "landscape 4":
      return "span 4";
    case "landscape 2":
      return "span 2";
    case "portrait 4":
      return "span 4";
    case "portrait 3":
      return "span 3";
    case "portrait 2":
      return "span 2";
  }
};
const handleMarginTop = marginTopPass => {
  switch (marginTopPass) {
    case "240px":
      return "240px";
    case "120px":
      return "120px";
    case "None":
      return "0px";
  }
};
const ImgCon = styled.div`
  grid-column: ${({ widthPass }) => handleWidth(widthPass)};
  margin-top: ${({ marginTopPass }) => handleMarginTop(marginTopPass)};
  position: relative;
`;
const handleHeight = heightPass => {
  switch (heightPass) {
    case "landscape 7":
      return "60vh";
    case "landscape 6":
      return "50vh";
    case "landscape 4":
      return "30vh";
    case "landscape 2":
      return "20vh";
    case "portrait 4":
      return "65vh";
    case "portrait 3":
      return "50vh";
    case "portrait 2":
      return "30vh";
  }
};

const handleHeightIpad = heightPass => {
  switch (heightPass) {
    case "landscape 7":
      return "25vh";
    case "landscape 6":
      return "20vh";
    case "landscape 4":
      return "15vh";
    case "landscape 2":
      return "8vh";
    case "portrait 4":
      return "45vh";
    case "portrait 3":
      return "20vh";
    case "portrait 2":
      return "10vh";
  }
};
const ImgConTwo = styled.div`
  height: ${({ heightPass }) => handleHeight(heightPass)};
  .gatsby-image-wrapper {
  }
  @media (max-width: 1024px) {
    height: ${({ heightPass }) => handleHeightIpad(heightPass)};
  }
`;
const ImgConThree = styled.div`
  position: absolute;
  top: 0;
  height: inherit;
  width: 100%;
  picture {
  }
  img {
  }
  .gatsby-image-wrapper {
    height: inherit;
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: inherit;
  background-color: white;
  z-index: 1000;
  display: 1;
  cursor: pointer;
  border: 1px solid #af9880;
  opacity: ${props => (props.display == true ? 0 : 1)};

  overflow: hidden;

  :hover {
    background-color: #af9880;
    p {
      color: white;
    }
  }
`;

const CaptionP = styled.p`
  font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
  font-variation-settings: "wght" 290;
  font-size: 12px;
  color: #af9880;
  line-height: 115%;

  padding: 10px;
  width: 100%;
  max-width: 184px;

  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */

  :hover {
    color: white;
  }
`;

const ImgNum = styled.div`
  padding: 10px;
  width: 184px;
  position: absolute;
  bottom: 2px;
  p {
    font-size: 12px;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290;
    color: #af9880;
    line-height: 110%;
  }
`;

const MobileImage = styled.div`
  grid-column: span 16;
  min-width: 100%;
  height: auto;
  a {
    min-width: 100%;
    height: auto;
    img {
      min-width: 100%;
      height: auto;
    }
  }
`;

const MobileProjectInfoCon = styled.div`
  display: grid;
  width: calc(100%);
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/;
  background-color: white;
  position: relative;
  top: 46px;
  z-index: 20000;
  margin-top: 10px;
  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    font-size: 18px;
    letter-spacing: -0.1px;
    line-height: 140%;
    color: #af9880;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

const MobileIndexNumCon = styled.div`
  float: left;
  border-left: 1px solid #af9880;
  border-top: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  grid-column: span 2;
  padding-left: 5px;
`;

const MobileTitleCon = styled.div`
  grid-column: span 6;
  font-size: 24px;
  letter-spacing: -1.44px;
  padding-left: 5px;
  border-top: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  border-left: 1px solid #af9880;
  border-right: 1px solid #af9880;
  padding-right: 5px;
`;

const ProjectCon = styled.div`
  width: calc(100vw - 20px);
  margin-left: 10px;
  /* margin-bottom: 60px; */
  float: left;
`;
const TitleCon = styled.div`
  grid-column: span 2;
  border-top: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  border-left: 1px solid #af9880;
  padding-right: 5px;
`;
const DateCon = styled.div`
  grid-column: span 1;
  border-left: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  border-top: 1px solid #af9880;
  padding-right: 5px;
`;
const LocationCon = styled.div`
  grid-column: span 2;
  border-left: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  border-top: 1px solid #af9880;
  padding-right: 5px;
`;
const DescriptorCon = styled.div`
  grid-column: span 6;
  line-height: 110%;
  border-left: 1px solid #af9880;
  border-bottom: 1px solid #af9880;
  border-top: 1px solid #af9880;
  border-right: 1px solid #af9880;
  padding-top: 8px;

  padding-right: 5px;

  p {
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 290 !important;
    font-size: 16px !important;
    letter-spacing: -0.1px !important;
    line-height: 115% !important;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  :hover {
    border-left: 1px solid white;
    border-right: 1px solid #af9880;
  }
`;
const ProjectInfoCon = styled.div`
  display: grid;
  width: calc(68.75vw - 20px);
  float: right;
  margin-left: 5px;
  grid-template-columns: 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr 1fr /* 4*/ 1fr 1fr 1fr;
  background-color: white;
  position: sticky;
  top: 10px;
  z-index: 20000;
  margin-top: 10px;

  p {
    font-size: 24px;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    line-height: 140%;
    padding-left: 8px;
    color: #af9880;

    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  :hover {
    background-color: #af9880;
    ${TitleCon} {
      /* border-left: 1px solid white; */
    }
    ${DateCon} {
      border-left: 1px solid white;
    }
    ${LocationCon} {
      border-left: 1px solid white;
    }
    ${DescriptorCon} {
      border-left: 1px solid white;
      border-right: 1px solid #af9880;
    }
    p {
      color: white;
    }
  }
`;

const IndexNumCon = styled.div`
  float: left;
  margin-top: 10px;
  border: 1px solid #af9880;
  width: 6.25%;

  p {
    font-size: 24px;
    font-family: "Helvetica Now Var Roman", helvetica, sans-serif;
    font-variation-settings: "wght" 340;
    line-height: 140%;
    letter-spacing: -0.1%;
    padding-left: 8px;
    color: #af9880;
  }
`;

const ProjectsCon = styled.div`
  margin-top: 15px;
`;

const BrownNavVisibiltyCon = styled.div`
  display: ${props => (props.brownNavProps == false ? "none" : "block")};
`;
const WhiteNavVisibilityCon = styled.div`
  display: ${props => (props.whiteNavProps == true ? "none" : "block")};
  /* display: none; */
`;

const Index = ({ data }) => {
  let isPageWide = useMediaQuery("(min-width: 667px)");

  const Img = ({
    img2,
    cap,
    widthProp,
    heightProp,
    showImage,
    marginTopProp,
    imgIndex,
    projectIndex,
  }) => {
    const [imgState, setImgState] = useState(showImage);
    function click() {
      console.log("click");
      if (imgState == false) {
        setImgState(true);
      } else {
        setImgState(false);
      }

      console.log(imgState);
    }
    return (
      <ImgCon
        onClick={click}
        widthPass={widthProp}
        marginTopPass={marginTopProp}
      >
        <ImgConTwo heightPass={heightProp}>
          <Overlay display={imgState}>
            <CaptionP>{cap}</CaptionP>
            <ImgNum>
              <p>
                0{projectIndex + 1}.{imgIndex + 1}
              </p>
            </ImgNum>
          </Overlay>
          <ImgConThree>
            <GatsbyImage className="test_img" image={img2} objectFit="cover" />
          </ImgConThree>
        </ImgConTwo>
      </ImgCon>
    );
  };

  const featuredProjectsDesktop = data.prismicFeaturedProjects.data.featured_projects_group.map(
    (content, projectIndex) => {
      const desktopImgs = content.featured_project.document.data.homepage_images.map(
        (content_two, imgIndex) => {
          const img = getImage(content_two.image);
          var test = content_two.image_caption.text;
          return (
            <>
              <Img
                imgIndex={imgIndex}
                projectIndex={projectIndex}
                img2={img}
                cap={test}
                widthProp={content_two.image_size}
                heightProp={content_two.image_size}
                showImage={content_two.show_image}
                marginTopProp={content_two.margin_top}
              ></Img>
            </>
          );
        }
      );
      return (
        <ProjectCon>
          <IndexNumCon>
            <p>0{projectIndex + 1}</p>
          </IndexNumCon>
          <Link to={`/${content.featured_project.document.uid}`}>
            <ProjectInfoCon>
              <TitleCon>
                <p>
                  {content.featured_project.document.data.project_title.text}
                </p>
              </TitleCon>
              <DateCon>
                <p>{content.featured_project.document.data.year.text}</p>
              </DateCon>
              <LocationCon>
                <p>{content.featured_project.document.data.location.text}</p>
              </LocationCon>
              <DescriptorCon>
                <p>
                  {content.featured_project.document.data.homepage_intro.text}
                </p>
              </DescriptorCon>
            </ProjectInfoCon>
          </Link>
          <ImgsCon>{desktopImgs}</ImgsCon>
        </ProjectCon>
      );
    }
  );

  const featuredProjectsMobile = data.prismicFeaturedProjects.data.featured_projects_group.map(
    (content, projectIndex) => {
      const MobileImg = () => {
        const mobileImage = getImage(
          content.featured_project.document.data.mobile_image
        );
        return (
          <MobileImage>
            <Link to={`/${content.featured_project.document.uid}`}>
              <GatsbyImage image={mobileImage} />
            </Link>
          </MobileImage>
        );
      };
      return (
        <>
          <ProjectCon>
            <Link to={`/${content.featured_project.document.uid}`}>
              <MobileProjectInfoCon>
                <MobileIndexNumCon>
                  <p>0{projectIndex + 1}</p>
                </MobileIndexNumCon>
                <MobileTitleCon>
                  <p>
                    {content.featured_project.document.data.project_title.text}
                  </p>
                </MobileTitleCon>
              </MobileProjectInfoCon>
              <ImgsCon>
                <MobileImg />
              </ImgsCon>
            </Link>
          </ProjectCon>
        </>
      );
    }
  );
  const Hero = ({ data }) => {
    const heroRef = useRef(null);
    const heroOnScreen = useOnScreen(heroRef);
    const [navState, setNavState] = useState(true);

    useEffect(() => {
      if (heroOnScreen === true) {
        setNavState(true);
      } else if (heroOnScreen === false) {
        setNavState(false);
      }
    }, [heroOnScreen]);
    return (
      <>
        <BrownNavVisibiltyCon brownNavProps={navState}>
          <Nav />
        </BrownNavVisibiltyCon>

        <WhiteNavVisibilityCon whiteNavProps={navState}>
          <NavWhite />
        </WhiteNavVisibilityCon>
        <HeroConCon ref={heroRef}>
          <HeroConOne>
            <IntroCon>
              <p>{data.prismicAbout.data.homepage_intro.text}</p>
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
                  <Link to={data.prismicAbout.data.instagram.url}>
                    Instagram
                  </Link>
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
                <p>Information</p>
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
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <title>Florence Devereux</title>
      </Helmet>

      <Hero data={data} />

      <ProjectsCon>
        {isPageWide ? featuredProjectsDesktop : featuredProjectsMobile}
      </ProjectsCon>
    </>
  );
};

export default withPrismicPreview(Index);

export const query = graphql`
  query MyQuery {
    prismicAbout {
      data {
        homepage_intro {
          text
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
    prismicFeaturedProjects {
      data {
        featured_projects_group {
          featured_project {
            document {
              ... on PrismicProject {
                id
                uid
                data {
                  homepage_images {
                    image {
                      gatsbyImageData
                    }
                    image_caption {
                      html
                      text
                    }
                    image_size
                    show_image
                    margin_top
                  }
                  homepage_intro {
                    html
                    text
                  }
                  location {
                    html
                    text
                  }
                  mobile_image {
                    gatsbyImageData(
                      width: 700
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                  }
                  project_title {
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
          }
        }
      }
    }
  }
`;
