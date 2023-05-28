import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import styled from "styled-components";
import Reviews from "../components/Reviews";
import { useParams, Link } from 'react-router-dom';
import KudosRating from "../components/KudosRating";
import kudos from "../apis/kudos";
import Footer from "../components/Footer";

const TextContainerDiv = styled.div`
    text-align: left;
    padding-left: 20px;
    width: 100%;
    @media screen and (max-width: 768px) {
        padding-left: 0px;
    }
`

const ReviewsDiv = styled.div`
    font-size: medium;
`

const NameDiv = styled.div`
    font-size: xx-large;
    font-weight: 500;
    padding: 10px;
    `

const ResultsHeader = styled.h2`
    text-align: left;
    color: rgb(182, 182, 182);
`

const SearchResultsImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    border-radius: 5px;
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
    font-size: large;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.2),
    0 0 10px rgba(0, 0, 0, 0.2);
    padding: 10px;
`

const SearchResultsDiv = styled.div`
    display: flex;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.2),
        0 0 10px rgba(0, 0, 0, 0.2);
    padding: 25px;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 25px;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`

const SearchResultsBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 100vh;
`

const RatingContainerDiv = styled.div`
    display: flex;
`
const ImageContainer = styled.div`
    width: 100%;
`
const SearchResultsContainer = styled.div`
    margin-left: 5%;
    margin-right: 5%;
`
const FooterDiv = styled.div`
    width: 100%;   
`

const SearchResults = () => {

    const { input } = useParams();
/*
    useEffect(() => {
        const getMatches = async() => {

            let results = await axios.get(`/api/getAllLike/${input}`);
            console.log(results.data)
        }
        getMatches();
    }, [input])
*/
    const [data, setData] = useState([]);

    useEffect(() => {
        const getAll = async() => {
            let results;
            if (input.toLowerCase() === 'all') {
                console.log('here')
                results = await kudos.get(`/api/reviews/topRated`);
            } else {
                results = await kudos.get(`/api/business/getAllLike/${input.toLowerCase()}`);
            }
            setData(results.data);
        }
        getAll();
    }, [input])


    //get distinct name where tag like input,
/*
    const filteredData = data.filter((element) => {
        //if no input the return the original
        return element.name.toLowerCase().includes(input.toLowerCase())
    })

    console.log(data)
    console.log(filteredData)
*/
    return (
        <>
        <SearchResultsBackground>
            <Navbar />
            <SearchResultsContainer>
                <ResultsHeader>{`All "${input}" results`}</ResultsHeader>
                {data.map((element, index) => (
                    <SearchResultsDiv key={index}>
                        {element.images ?
                        <ImageContainer>
                            <SearchResultsImage src={element.name !== "Jack's Pizza Shack" ? element.images[0] : element.images[1]}/>
                        </ImageContainer>
                        :
                        'No Images'}
                        <TextContainerDiv>
                            <NameDiv>
                                {element.name}
                            </NameDiv>
                            <RatingContainerDiv>
                                <FlowerDiv>
                                    <FlowerImage src={'./flower.png'}/>
                                </FlowerDiv>
                                <KudosDiv>
                                    <KudosRating name={element.name} />
                                </KudosDiv>
                            </RatingContainerDiv>
                            <ReviewsDiv>
                                <Reviews name={element.name} limitTwo={true} />
                            </ReviewsDiv>
                            <Link to={`/Businesses/${element.name}`}>More</Link>
                        </TextContainerDiv>

                    </SearchResultsDiv>
                ))}
            </SearchResultsContainer>
        </SearchResultsBackground>
        <FooterDiv>
            <Footer styleProps={true} />
        </FooterDiv>
        </>
    )
}

export default SearchResults;