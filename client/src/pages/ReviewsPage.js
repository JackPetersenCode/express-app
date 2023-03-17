import React, {useEffect, useState} from "react"
import styled from "styled-components";
import Navbar from "./NavBar";
import SearchBar from "../components/SearchBar";
import SearchList from "../components/SearchList";
import kudos from "../apis/kudos";

const Flower = styled.img`
    width: 75px;
    height: 75px;
`

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
`
const CenterDiv = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
`
const StyledHeader = styled.h2`
    display: grid;
    place-items: center;
    font-size: x-large;
    color: white;
    margin: 20px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.5);
`
const SearchBarContainer = styled.div`
    display: grid;
    place-items: center;
    min-width: 400px;
`
const StyledInput = styled.textarea`
    width: 500px;
    height: 200px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    resize: none;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
`
const ReviewsDiv = styled.div`
    display: grid;
    place-items: center;
    margin-bottom: 50px;
`
const FlowerDiv = styled.div`
    display: grid;
    place-items: center;
    margin-top: 50px;
`
const ButtonDiv = styled.div`
    text-align: center;
    padding: 10px;
`
const ReviewsButton = styled.button`
    background-color: red;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    border: none;
    color: white;
`


const ReviewsPage = ({ profile }) => {
    
    const [inputText, setInputText] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [allBusinesses, setAllBusinesses] = useState([]);
    const [review, setReview] = useState('');


    useEffect(() => {
        const getAll = async() => {
            let results = await kudos.get(`/api/business/searchAll`);
            console.log(results.data)

            setAllBusinesses(results.data);
        }
        getAll()
    }, [])

    const onSearch = (name) => {
        setInputText(name);
        console.log(`heres the thing you searched for: ${name}`);
    }

    const postReview = async() => {
        let reviewer;
        if (profile.name) {
            reviewer = profile.name;            
        } else {
            reviewer = 'Not Signed In'
        }
        try {
            let results = await kudos.post(`/api/reviews`, {name: selectedBusiness, review: review, reviewer: reviewer});
            console.log(results.data)
            console.log('postage')
            if (results.data) {
                alert('Review Posted!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BusinessesBackground>
            <Navbar />
            <CenterDiv>
                <StyledHeader>Find a business to review</StyledHeader>
                <br></br>
                <SearchBarContainer>
                    <SearchBar inputText={inputText} setInputText={setInputText} reviewsList={true} />
                    {allBusinesses.length > 0 && inputText.length > 0 ?
                        <SearchList inputText={inputText} setInputText={setInputText} data={allBusinesses} onSearch={onSearch} reviewsList={true} selectedBusiness={selectedBusiness} setSelectedBusiness={setSelectedBusiness} /> 
                    : 
                        ''
                    }
                </SearchBarContainer>
                <FlowerDiv>
                    <Flower src={'./flower.png'}/>
                </FlowerDiv>
                <ReviewsDiv>
                    { selectedBusiness.length > 0 ?
                    <div>
                        <h2>{selectedBusiness}</h2>
                        <StyledInput value={review} onChange={(e) => {
                            e.target.setAttribute('size', e.target.value.length);
                            setReview(e.target.value)}}
                                type="text" placeholder="Write your review..." id="review" name="review" ></StyledInput>
                        <ButtonDiv>
                            <ReviewsButton onClick={postReview}>Submit Review</ReviewsButton>
                        </ButtonDiv>
                    </div>
                    :
                    ''
                    }
                </ReviewsDiv>
            </CenterDiv>
        </BusinessesBackground>
    )
}

export default ReviewsPage;