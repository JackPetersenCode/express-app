import React, {useState, useEffect, useRef} from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import "../App.css";
import styled from 'styled-components';
import { Link, useNavigate } from "react-router-dom";
import SearchList from './SearchList';
import { createTheme, rgbToHex, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main: 'rgb(0,0,0)',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
  },
});

const ContainerDiv = styled.div`
    position: relative;
`

const TextDiv = styled.div`
`
const DropdownStyle = styled.div`
    position: absolute;
`

const SearchBar = ({ allBusinesses, inputText, setInputText, selectedBusiness, setSelectedBusiness, reviewsList }) => {

    let navigate = useNavigate();
    let refTwo = useRef(null);

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
      <ContainerDiv ref={refTwo} >
        <TextDiv>
          <ThemeProvider theme={theme}>
            <TextField 
              fullWidth
              id="outlined-basic"
              onChange={inputHandler}
              variant="outlined"
              placeholder={reviewsList ? "Search" : "restaurants, landscapers, all"}
              style={{backgroundColor: 'white', borderRadius: '5px'}}
              value={inputText}
              InputProps={{
                  endAdornment: <InputAdornment position="start"><Link to={`/${inputText}`}><SearchIcon /></Link></InputAdornment>,
              }}
              onKeyDown={reviewsList ? handleEnterReviews : handleEnter}
            />
          </ThemeProvider>
        </TextDiv>
        {reviewsList ?
        <DropdownStyle>
          {allBusinesses.length > 0 && inputText.length > 0 ?
            <SearchList refTwo={refTwo} inputText={inputText} setInputText={setInputText} data={allBusinesses} reviewsList={true} selectedBusiness={selectedBusiness} setSelectedBusiness={setSelectedBusiness} /> 
            : 
          ''}
        </DropdownStyle>
        :
        <DropdownStyle>
          {allBusinesses.length > 0 && inputText.length > 0 ?
            <SearchList refTwo={refTwo} inputText={inputText} setInputText={setInputText} data={allBusinesses} /> 
            : 
          ''}
        </DropdownStyle>
        }
      </ContainerDiv>
    );
}

export default SearchBar;