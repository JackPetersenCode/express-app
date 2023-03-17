import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import Navbar from "./NavBar";
import image1 from '../landscaping.jpg'
import image2 from '../kitchen.jpg'
import image3 from '../burger5.jpg'
import { Slide, Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import '../App.css'
import FadeButton from "../components/FadeButton";


const images = [
    {url: image1, text: 'Make those neighbors jealous', name: 'Landscapers'},
    {url: image2, text: "Get a good scrubbin'", name: 'Cleaners'},
    {url: image3, text: "Need a juicy burger?", name: 'Burgers'}
];

const TextDiv = styled.div`
    font-size: xxx-large;
    color: white;
    font-weight: 750;
    font-family: arial;
    padding-left: max(50px, 10%);
    padding-top: 60px;
    max-width: 500px;
    text-shadow: 0 0 0.2em #87F, 0 0 0.2em black,
        0 0 0.2em black; 
`

const Home = () => {
    
    return (
      <div>
        <Fade autoplay infinite duration={5000}>
          {images.map((fadeImage, index) => (
            <div key={index}>
              <div style={{ height: '100vh',
                            backgroundImage: `url(${fadeImage.url})`,
                            width: '100%',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                            }}>
                <Navbar />
                <TextDiv>{fadeImage.text}</TextDiv>
                <FadeButton name={fadeImage.name} />
              </div>
            </div>
          ))}
        </Fade>
      </div>
    )
}

export default Home;