import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import styled from "styled-components";
import Reviews from "../components/Reviews";
import kudos from "../apis/kudos.js";
import KudosRating from "../components/KudosRating";
import GoogleMap from "../components/GoogleMap";
import { getImageSize } from 'react-image-size';


const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
`

const BusinessImage = styled.img`
    width: 100%;
    min-height: 300px;
    height: 100%;
    object-fit: cover;

`
const ImageDiv = styled.div`
    display: flex;
    box-shadow: 0 0 20px rgba(48, 48, 48), 0 0 20px rgba(48, 48, 48),
    0 0 20px rgba(48, 48, 48);   
`
const BusinessName = styled.div`
    color: white;
    font-size: xxx-large;
    font-weight: 700;
    text-shadow: 0 0 0.1em black, 0 0 0.1em black,
    0 0 0.1em black;
    white-space: nowrap
`
const BusinessDescription = styled.div`
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    border-radius: 5px;
    background-color: white;
`
const WrapperDiv = styled.div`
    
`
const BusinessNameWrapper = styled.div`
    text-align: center;
    z-index: 10;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    padding-left: max(200px, 30%);
    padding-top: 100px;
`
const RatingContainerDiv = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;    
    
`

const FlowerDiv = styled.div`
    display: flex;
    place-items: center;
`

const FlowerImage = styled.img`
    max-height: 100%;
`

const KudosDiv = styled.div`
    display: flex;
    font-size: x-large;
    text-shadow: 0 0 10px black, 0 0 10px black,
    0 0 10px black;
    padding: 10px;
    color: white;
`
const BottomPageWrapper = styled.div`
    padding: 50px;
`
const BottomDiv = styled.div`
    display: flex;
`
const MapWrap = styled.div`
    margin-top: 320px;    
`
const BelowMapDiv = styled.div`
    margin-top: 520px;
`
const ReviewsWrapper = styled.div`
    background-color: white;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    border-radius: 5px;
    margin-top: 20px;
`
const FromTheBusiness = styled.h2`
    padding-top: 10px;
    text-align: center;
`
const Description = styled.div`
    padding: 10px;
`
const InnerImageDiv = styled.div`
`
const bannerStyle = (image) => ({
    flex: image,
})

const ImagePractice = () => {

    const { name } = useParams();

    const [business, setBusiness] = useState({});
    const [bannerImages, setBannerImages] = useState([]);

    useEffect(() => {

        const getBusiness = async() => {
            let results = await kudos.get(`/api/business/${name}`);
            setBusiness(results.data[0]);
        }
        getBusiness();
    }, [name])
/*
    useEffect(() => {

        const getImageDimensions = async() => {
            for(let i = 0; i < business.images.length; i++) {
                try {
                    const dimensions = await getImageSize(business.images[i]);
                    console.log(dimensions);
                    setBannerImages([...bannerImages, dimensions.width / dimensions.height]);

                } catch (error) {
                    console.error(error);
                }
            }        
        }
        if (business.images) {
            getImageDimensions();
        }
    }, [business])
*/
    return (
            <>
                {business.images ?
                <ImageDiv>
                    {business.images.map((image, index) => (
                        <InnerImageDiv key={index}>
                            <BusinessImage src={image} />
                        </InnerImageDiv>
                    ))}
                </ImageDiv>
                :
                ""}
            </>

    )
}

export default ImagePractice;