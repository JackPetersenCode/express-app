import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import styled from "styled-components";
import Reviews from "../components/Reviews";
import kudos from "../apis/kudos.js";
import KudosRating from "../components/KudosRating";
import GoogleMap from "../components/GoogleMap";
import { getImageSize } from 'react-image-size';
import Footer from "../components/Footer";


const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 1000px;
`

const BusinessImage = styled.img`
    width: 100%;
    min-height: 300px;
    height: 100%;
    object-fit: cover;
    @media screen and (max-width: 768px) {
        min-height: 200px;
    }
`
const ImageDiv = styled.div`
    display: flex;
    max-height: 300px;
    position: relative;
    @media screen and (max-width: 768px) {
        max-height: 200px;
    }
`
const BusinessName = styled.div`
    color: white;
    font-size: xxx-large;
    font-weight: 700;
    text-shadow: 0 0 0.1em black, 0 0 0.1em black,
    0 0 0.1em black;
    white-space: nowrap;
    @media screen and (max-width: 768px) {
        font-size: xx-large;
        white-space: normal;
    }
`
const BusinessDescription = styled.div`
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    border-radius: 5px;
    background-color: white;
    margin-bottom: 20px;
`

const WrapperDiv = styled.div`
    position: relative;
`
const BusinessNameWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    right: 0;
    top: 35%;
    text-align: center;
    z-index: 10;
    @media screen and (max-width: 768px) {
        top: 35%;
    }
`
const RatingContainerDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const FlowerDiv = styled.div`
`

const FlowerImage = styled.img`
    max-height: 100%;
`

const KudosDiv = styled.div`
    font-size: x-large;
    padding: 10px;
    color: white;
    @media screen and (max-width: 768px) {
        font-size: large;
    }
`
const BottomPageWrapper = styled.div`
    padding: 20px;
    @media screen and (min-width: 769px) {
        width: 100%;
    }
`
const BottomDiv = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`
const MapWrap = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
`
const BelowMapDiv = styled.div`
    margin-top: 13px;
    margin-bottom: 10px;
    @media screen and (max-width: 768px) {
        margin-left: 5%;
    }
`
const ReviewsWrapper = styled.div`
    background-color: white;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    border-radius: 5px;
`
const FromTheBusiness = styled.div`
    font-size: x-large;
    text-align: center;
    font-weight: 700;

`
const Description = styled.div`
    padding: 10px;
`
const InnerImageDiv = styled.div`

`
const AddressDiv = styled.div`
    font-size: large;
    font-weight: 700;
`
const FooterDiv = styled.div`
    width: 100%; 
    

`


const Businesses = () => {

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
        {business.name ?
        <>
        <BusinessesBackground>
            <NavBar />
            <WrapperDiv>
                <ImageDiv>
                    {business.images.map((image, index) => (
                        <InnerImageDiv key={index}>
                            <BusinessImage src={image} />
                        </InnerImageDiv>
                    ))}
                </ImageDiv>
                <BusinessNameWrapper>
                    <BusinessName>
                        {business.name}
                    </BusinessName>
                    <RatingContainerDiv>
                        <FlowerDiv>
                            <FlowerImage src={'/newLogo.png'}/>
                        </FlowerDiv>
                        <KudosDiv>
                            <KudosRating name={business.name} shadow={true} />
                        </KudosDiv>
                    </RatingContainerDiv>
                </BusinessNameWrapper>
            </WrapperDiv>
            <BottomDiv>
                <BottomPageWrapper>
                    <BusinessDescription>
                        <FromTheBusiness>About the Business</FromTheBusiness>
                        <Description>
                            {business.description}
                        </Description>
                    </BusinessDescription>
                    <ReviewsWrapper>
                        <FromTheBusiness>Review Highlights</FromTheBusiness>
                        <Reviews name={business.name} />
                    </ReviewsWrapper>
                </BottomPageWrapper>
                <MapWrap>
                    <BelowMapDiv>
                        <AddressDiv>Business address:</AddressDiv>
                        {business.address}
                    </BelowMapDiv>
                    <GoogleMap address={business.address} />
                </MapWrap>
            </BottomDiv>
        </BusinessesBackground>
        <FooterDiv>
            <Footer styleProps={true} />
        </FooterDiv>
        </>
        : ''}
        </>
    )
}

export default Businesses;