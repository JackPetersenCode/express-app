import React from "react";
import styled from "styled-components";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
  padding-left: max(50px, 10%);
  padding-top: 25px;
`
const StyledButton = styled.button`
  background-color: red;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
  border-radius: 5px;
  border: none;
  color: white;
`
const StyledSpan = styled.span`
  padding-top: 5px;
  font-size: large;
`

const FadeButton = ({name}) => {



    return (
        <StyledDiv>
          <Link to={`/${name}`} style={{textDecoration: 'none'}} >
          <StyledButton>
            <SearchIcon style={{fontSize: 'xx-large'}}/>
            <StyledSpan>{name}</StyledSpan>
          </StyledButton>
          </Link>        
        </StyledDiv>
    )
}

export default FadeButton;