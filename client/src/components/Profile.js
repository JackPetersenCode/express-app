import React, { useEffect, useState } from "react";
import Navbar from "../pages/NavBar";
import kudos from "../apis/kudos.js";
import Reviews from "./Reviews";
import Login from "./Login";
import KudosRating from "./KudosRating";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import Footer from "./Footer";


const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 100vh;
`


const ProfileInfo = styled.div`
    font-size: xx-large;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.8);
`
const YourBusiness = styled.div`
    font-size: x-large;
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.5);
`
const LogoutButton = styled.button`
    width: 100px;
    margin-top: 20px;
    color: white;
    background-color: rgb(23, 23, 23);
    padding: 10px;
    border-radius: 5px;
    border-width: 5px;
    border-color: gray;
`

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

const Profile = ({ profile, setProfile }) => {

    const handleLogout = async() => {
        kudos.post('/api/users/logout')
            .then((respones) => {
                console.log('logged out!')
                setProfile('');
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const [ownedBusinesses, setOwnedBusinesses] = useState([]);

    useEffect(() => {
        
        const getBusinessesFromEmail = async() => {
            let results = await kudos.get(`/api/business/email/${profile.email}`);
            setOwnedBusinesses(results.data);
        }
        if (profile.email) {
            getBusinessesFromEmail();
        }
    }, [profile])

    return (
        <>
            { profile.email ? 
            <>
            <BusinessesBackground>
                <Navbar />
                <SearchResultsContainer>
                    <LogoutButton onClick={handleLogout}>
                        Log Out
                    </LogoutButton>
                    <ProfileInfo>
                        {'Welcome Back, ' + profile.name + '!'}
                    </ProfileInfo>
                    <YourBusiness>
                        Your Businesses:
                    </YourBusiness>

                    {ownedBusinesses.map((element, index) => (
                    <SearchResultsDiv key={index}>
                        {element.images ?
                        <ImageContainer>
                            <SearchResultsImage src={element.images[0]}/>
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
                                <Reviews name={element.name} />
                            </ReviewsDiv>
                            <Link to={`/Businesses/${element.name}`}>More</Link>
                        </TextContainerDiv>
                    </SearchResultsDiv>
                    ))}
                </SearchResultsContainer>
            </BusinessesBackground>
            <FooterDiv>
                <Footer styleProps={true} />
            </FooterDiv>
            </>
            : <Login profile={profile} setProfile={setProfile} /> }
        </>
    )
}

export default Profile;