import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import styled from "styled-components";
import axios from "axios";
import { useParams } from "react-router-dom";

const RestaurantBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
`

const Restaurants = () => {


    useEffect(() => {
        
        const getAllRestaurants = async() => {
            let results = await axios.get('/api/restaurants/getAll');
            let restaurants = results.data;
            console.log(restaurants)
        }
        getAllRestaurants();
    }, [])

    return (
        <RestaurantBackground>
            <Navbar />
        </RestaurantBackground>
    )
}

export default Restaurants;