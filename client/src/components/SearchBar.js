import React, {useState, useEffect} from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import "../App.css";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";


const ContainerDiv = styled.div`
    position: relative;
`

const TextDiv = styled.div`
    padding-top: 20px;
`

const SearchBar = ({ inputText, setInputText, selectedBusiness, setSelectedBusiness, reviewsList }) => {

    let navigate = useNavigate();

    let inputHandler = (e) => {
      //convert input text to lower case
      var lowerCase = e.target.value.toLowerCase();
      setInputText(lowerCase);
    };

    let handleEnter = (e) => {
      if (e.key === 'Enter') {
        console.log(inputText)
        navigate(`/${inputText}`)
      }
    }

    let handleEnterReviews = (e) => {
      if (e.key === 'Enter') {
        alert('Select a business from drop down menu.')
      }
    }

    return (
      <ContainerDiv>
        <TextDiv>
          <TextField 
            fullWidth
            id="outlined-basic"
            onChange={inputHandler}
            variant="outlined"
            label="Search"
            style={{backgroundColor: 'white', borderRadius: '5px'}}
            value={inputText}
            InputProps={{
                endAdornment: <InputAdornment position="start"><Link to={`/${inputText}`}><SearchIcon /></Link></InputAdornment>,
            }}
            onKeyDown={reviewsList ? handleEnterReviews : handleEnter}
          />
        </TextDiv>
      </ContainerDiv>
    );
}

export default SearchBar;