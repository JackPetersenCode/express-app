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
import kudos from "../apis/kudos";
import Slideshow from "../components/Slideshow";
import MediaQuery from 'react-responsive';



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
const SlideshowContainer = styled.div`
  width: 100%;
  height: auto;
`

const Home = () => {
    
    const [allBusinesses, setAllBusinesses] = useState([]);

    useEffect(() => {

        const getAllBusinesses = async() => {
            try {
                let results = await kudos.get('/api/reviews/topRated'); 
                console.log(results.data);
                setAllBusinesses(results.data);             
            } catch (error) {
                console.log(error);
            }
        }
        getAllBusinesses();
    }, [])

    return (
      <>
        <MediaQuery maxWidth={768}>
          <Navbar />
        </MediaQuery>
        <Slideshow />
      </>
    )
}

export default Home;