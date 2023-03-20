import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kudos from "../apis/kudos.js";

const StyledRating = styled.span`
    margin-left: 60px;
    color: rgba(85,163,1);
    

    `

const KudosRating = ({ name }) => {

    const [count, setCount] = useState(0);
    const [rating, setRating] = useState('');

    useEffect(() => {

        const getCount = async() => {

            let results = await kudos.get(`/api/reviews/count/${name}`);
            setCount(results.data[0].count);
        }
        getCount();
    }, [name])

    useEffect(() => {
        const getRating = async() => {
            if (count <= 5) {
                setRating('New to Kudos!');
            } else if (count > 5 && count <= 20) {
                setRating('Kudos Pro!');
            } else if (count > 20 && count <= 50) {
                setRating('Kudo-tastic!');
            } else {
                setRating('Kudo Masters!')
            }
        }
        getRating();
    }, [count])

    return (
        <>
        <span data-testid={"review-count"}>
            {`${count} reviews`}
        </span>
        <StyledRating>
            {rating}
        </StyledRating>
        </>
    )
}

export default KudosRating;