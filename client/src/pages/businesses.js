import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import styled from "styled-components";
import Reviews from "../components/Reviews";
import kudos from "../apis/kudos.js";
import KudosRating from "../components/KudosRating";
import GoogleMap from "../components/GoogleMap";

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
`

const BusinessImage = styled.img`
    max-height: 300px;
    min-height: 100%;
    width: 100%;
    margin: auto;
`
const ImageDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(3, minmax(500px, 1fr));
    grid-template-rows: 300px;
    max-width: fit-content;
    position: absolute;
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
    margin-top: 300px;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    max-width: fit-content;
    border-radius: 5px;
    background-color: white;
    min-width: 300px;
`
const WrapperDiv = styled.div`
    margin-top: 20px;
`
const BusinessNameWrapper = styled.div`
    text-align: center;
    position: absolute;
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
    position: absolute;
    
    
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
    flex: 50%;
    min-width: 300px;
`
const BottomDiv = styled.div`
    display: flex;
`
const MapWrap = styled.div`
    margin-top: 320px;
    flex: 50%;
    
`
const BelowMapDiv = styled.div`
    margin-top: 520px;
`
const ReviewsWrapper = styled.div`
    background-color: white;
    max-width: fit-content;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    border-radius: 5px;
    margin-top: 20px;
    min-width: 300px;
`
const FromTheBusiness = styled.h2`
    padding-top: 10px;
    text-align: center;
`
const Description = styled.div`
    padding: 10px;
`

const Businesses = () => {

    const { name } = useParams();
    console.log(name)

    const [business, setBusiness] = useState({});

    useEffect(() => {

        const getBusiness = async() => {
            let results = await kudos.get(`/api/business/${name}`);
            setBusiness(results.data[0]);
            console.log(results.data[0].address)
        }
        getBusiness();
    }, [name])

    return (
        <>
        {business.name ?
        <BusinessesBackground>
            <NavBar />
            <WrapperDiv>
                <ImageDiv>
                    {business.images.map((image, index) => (
                        <BusinessImage key={index} src={image} />
                    ))}
                </ImageDiv>
                <BusinessNameWrapper>
                    <BusinessName>
                        {business.name}
                    </BusinessName>
                    <div style={{display: 'grid'}}>
                    <RatingContainerDiv>
                        <FlowerDiv>
                            <FlowerImage src={'/flower2.png'}/>
                        </FlowerDiv>
                        <KudosDiv>
                            <KudosRating name={business.name} />
                        </KudosDiv>
                    </RatingContainerDiv>
                    </div>
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
                    <GoogleMap address={business.address} />
                    <BelowMapDiv>
                        <h3>Business address:</h3>
                        {business.address}
                    </BelowMapDiv>
                </MapWrap>
            </BottomDiv>
        </BusinessesBackground>
        : ''}
        </>
    )
}

export default Businesses;