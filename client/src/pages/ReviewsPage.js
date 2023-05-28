import React, {useEffect, useState} from "react"
import styled from "styled-components";
import Navbar from "./NavBar";
import SearchBar from "../components/SearchBar";
import SearchList from "../components/SearchList";
import kudos from "../apis/kudos";
import Chat from "../components/ChatAi";
import Footer from "../components/Footer";

const Flower = styled.img`
    width: 40px;
    height: 40px;
    
`

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 100vh;

`
const CenterDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledHeader = styled.div`
    text-align: center;
    font-size: x-large;
    color: white;
    padding: 10px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.5);
`
const SearchBarContainer = styled.div`
    
`
const StyledInput = styled.textarea`
    width: 80vw;
    max-width: 500px;
    height: 200px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
`
const ReviewsDiv = styled.div`
    margin-top: 20px;
`
const FlowerDiv = styled.div`

    margin-top: 20px;
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
const HeaderDiv = styled.div`
    text-align: center;
    font-size: x-large;
    padding: 10px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 10px rgba(255, 255, 255, 0.5),
    0 0 10px rgba(255, 255, 255, 0.5);
`
const FooterDiv = styled.div`
    width: 100%;
    height: 
`
const BigWrap = styled.div`
    min-height: 100vh;
`

const ReviewsPage = ({ profile }) => {
    
    const [inputText, setInputText] = useState('');
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [allBusinesses, setAllBusinesses] = useState([]);
    const [review, setReview] = useState('');


    useEffect(() => {
        const getAll = async() => {
            let results = await kudos.get(`/api/business/searchAll`);
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
            if (results.data) {
                alert('Review Posted!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
        <BusinessesBackground>
            <Navbar />
            <CenterDiv>
                <FlowerDiv>
                    <Flower src={'./newLogo.png'}/>
                </FlowerDiv>
                <StyledHeader>Find a business to review</StyledHeader>
                <SearchBarContainer>
                    <SearchBar allBusinesses={allBusinesses} inputText={inputText} setInputText={setInputText} selectedBusiness={selectedBusiness} setSelectedBusiness={setSelectedBusiness} reviewsList={true} />
                </SearchBarContainer>
                { selectedBusiness.length > 0 ?
                <ReviewsDiv>
                    <HeaderDiv>{selectedBusiness}</HeaderDiv>
                    <StyledInput value={review} onChange={(e) => {
                        e.target.setAttribute('size', e.target.value.length);
                        setReview(e.target.value)}}
                            type="text" placeholder="Write your review..." id="review" name="review" ></StyledInput>
                    <ButtonDiv>
                        <ReviewsButton onClick={postReview}>Submit Review</ReviewsButton>
                    </ButtonDiv>
                </ReviewsDiv>
                :
                ''
                }
            </CenterDiv>
        </BusinessesBackground>
        <FooterDiv>
            <Footer styleProps={true} />
        </FooterDiv>
        </>
    )
}

export default ReviewsPage;