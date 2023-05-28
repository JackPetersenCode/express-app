import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kudos from "../apis/kudos.js";

const StyledRating = styled.span`
    margin-left: 40px;
    color: rgb(47, 255, 0);
    text-shadow: 0 0 5px black, 0 0 5px black,
    0 0 5px black;
    `
const KudosFlex = styled.div`
    display: flex;
    align-items: center;

`
const ReviewsDiv = styled.div`
    white-space: nowrap;
`



const KudosRating = ({ name, shadow }) => {

    const [count, setCount] = useState(0);
    const [rating, setRating] = useState('');

    useEffect(() => {

        const getCount = async() => {

            let results = await kudos.get(`/api/reviews/count/${name}`);
            console.log(results.data)
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
        <KudosFlex>
          <div className={shadow ? "reviews-shadow" : "no-shadow"} data-testid={"review-count"}>
              {`${count} reviews`}
          </div>
          <StyledRating>
              {rating}
          </StyledRating>
        </KudosFlex>
    )
}

export default KudosRating;