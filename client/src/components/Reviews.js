import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kudos from "../apis/kudos";

const ReviewsStyleDiv = styled.div`
    font-size: medium;
    padding: 10px;
    color: rgba(0, 0, 0, 0.6);
    
`
const ReviewerDiv = styled.div`
    padding: 10px;
`

const Reviews = ({ name }) => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        const getReviews = async() => {
            console.log(name)
            let results = await kudos.get(`/api/reviews/${name}`);
            setReviews(results.data);
            console.log(results.data)
        }
        getReviews();
    }, [name])

    return (
        <div style={{resize: 'both'}}>
            {reviews.map((review, index) => (
                <ReviewsStyleDiv key={index}>{`${review.review}`}<br></br><ReviewerDiv>{`-${review.reviewer}`}</ReviewerDiv></ReviewsStyleDiv>
            ))}
        </div>
    )
}

export default Reviews;