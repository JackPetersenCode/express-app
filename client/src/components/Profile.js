import React, { useEffect, useState } from "react";
import Navbar from "../pages/NavBar";
import kudos from "../apis/kudos.js";
import Reviews from "./Reviews";
import Login from "./Login";
import KudosRating from "./KudosRating";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";


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

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
`

const RatingContainerDiv = styled.div`
    display: flex;
    alignItems: center;
    flexWrap: wrap;
    max-height: 50px;
`
const ProfileInfo = styled.div`
    margin-bottom: 50px;
    margin-left: 50px;
    margin-top: 20px;
    font-size: xx-large;
    color: white;
    font-weight: 700;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.8);
`
const YourBusiness = styled.div`
    margin-left: 50px;
    font-size: x-large;
    color: white;
    margin-bottom: 20px;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(0, 0, 0, 0.5);
`
const LogoutButton = styled.button`
    margin-left: 50px;
    margin-bottom: 20px;
    margin-top: 20px;
    color: white;
    background-color: rgb(23, 23, 23);
    padding: 10px;
    border-radius: 5px;
    border-width: 5px;
    border-color: gray;
`

const Profile = ({ profile, setProfile }) => {

    const navigate = useNavigate();

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
            console.log(results.data)
        }
        if (profile.email) {
            getBusinessesFromEmail();
        }
    }, [profile])

    console.log(profile)
    return (
        <>
            { profile.email ? 
            <BusinessesBackground>
                <Navbar />
                    <LogoutButton onClick={handleLogout}>
                        Log Out
                    </LogoutButton>
                <ProfileInfo>
                    {'Welcome Back, ' + profile.name + '!'}
                </ProfileInfo>
                <YourBusiness>
                    Your Businesses:
                </YourBusiness>
                <div>
                {ownedBusinesses.map((element, index) => (
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
                </div>
            </BusinessesBackground>
            : <Login profile={profile} setProfile={setProfile} navigate={navigate} /> }
        </>
    )
}

export default Profile;