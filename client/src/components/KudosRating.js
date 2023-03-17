import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kudos from "../apis/kudos.js";

const KudosRating = ({ name }) => {

    const [count, setCount] = useState([]);

    useEffect(() => {

        const getCount = async() => {
            let results = await kudos.get(`/api/reviews/count/${name}`);
            setCount(results.data[0].count);
            console.log(results.data)
        }
        getCount();
    }, [name])

    return (
        <p data-testid={"review-count"}>
            {`${count} reviews`}
        </p>
    )
}

export default KudosRating;