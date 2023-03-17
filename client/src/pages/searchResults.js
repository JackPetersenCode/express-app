import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import styled from "styled-components";
import Reviews from "../components/Reviews";
import { useParams, Link } from 'react-router-dom';
import KudosRating from "../components/KudosRating";
import kudos from "../apis/kudos";

const TextContainerDiv = styled.div`
    text-align: left;
    padding-left: 20px;
`

const ReviewsDiv = styled.div`
    font-size: medium;
    max-width: 300px;
`

const NameDiv = styled.div`
    font-size: x-large;
    font-weight: 500;
    padding: 10px;
    `

const ResultsHeader = styled.h2`
    padding-left: max(50px, 5%);
    text-align: left;
    min-width: 400px;
`

const SearchResultsImage = styled.img`
    display: grid;
    place-items: left;
    max-width: 350px;
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
    display: grid;
    grid-template-columns: 400px minmax(400px, 1fr);
    grid-template-rows: auto;
    max-width: fit-content;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.2),
        0 0 10px rgba(0, 0, 0, 0.2);
    padding: 25px;
    margin-left: 50px;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 25px;
`

const SearchResultsBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
`

const RatingContainerDiv = styled.div`
    display: flex;
    alignItems: center;
    flexWrap: wrap;
    max-height: 50px;
`

const SearchResults = () => {

    const { input } = useParams();
    console.log(input)
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
            console.log(input)
            let results = await kudos.get(`/api/business/getAllLike/${input.toLowerCase()}`);
            console.log(results.data)

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
        <SearchResultsBackground>
            <Navbar />
            <ResultsHeader>{`All "${input}" results`}</ResultsHeader>
            {data.map((element, index) => (
                <SearchResultsDiv key={index}>
                    {element.images ?
                    <SearchResultsImage src={element.images[0]}/>
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
                            <Reviews name={element.name} />
                        </ReviewsDiv>
                        <Link to={`/Businesses/${element.name}`}>More</Link>
                    </TextContainerDiv>

                </SearchResultsDiv>
            ))}
        </SearchResultsBackground>
    )
}

export default SearchResults;