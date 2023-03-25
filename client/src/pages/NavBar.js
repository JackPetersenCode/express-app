import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import '../App.css';
import SearchBar from "../components/SearchBar";
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import YardIcon from '@mui/icons-material/Yard';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import PianoIcon from '@mui/icons-material/Piano';
import SportsGymnasticsIcon from '@mui/icons-material/SportsGymnastics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchList from "../components/SearchList";
import kudos from "../apis/kudos.js";


const NavContainer = styled.nav`
    display: grid;
    max-height: 75px;
    grid-template-columns: 175px minmax(400px, 3fr) minmax(100px, 1fr) minmax(100px, 1fr) minmax(100px, 1fr);
    grid-template-rows: auto
`

const LowerNavContainer = styled.nav`
    display: grid;
    grid-template-columns: minmax(175px, 1fr) repeat(8, 1fr);
    grid-template-rows: auto;
    color: white;
`

const TopNavLinks = styled.div`
    display: grid;
    text-align: center;
    place-items: center;
    max-height: 75px;
`

const LogoNavLink = styled.div`
    display: grid;
    text-align: center;
    padding: 10px
`
const DropDownContent = styled.div`
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    z-index: 15;
    min-width: 15%;
    border-radius: 5px;
    flex-direction: column;
    padding: 10px;
    min-width: 150px;
    text-decoration: none;
    color: black;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
  `

const GridLink = styled.div`
    padding: 10px;
    display: flex;
    alignItems: center;
    flexWrap: wrap;
`

const FirstNavLink = styled.div`
    grid-column-start: 2;
    grid-column-end: 3;
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }
    &:hover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
    &:mouseover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
  `

const DropDownGrid = styled.div`
  padding: 5px;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
`

const SecondNavLink = styled.div`
    grid-column-start: 3;
    grid-column-end: 4;
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }
    &:hover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
    &:mouseover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
  `

const ThirdNavLink = styled.div`
    grid-column-start: 4;
    grid-column-end: 5;
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }
    &:hover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
    &:mouseover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
  `

const FourthNavLink = styled.div`
    grid-column-start: 5;
    grid-column-end: 6;
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }
    &:hover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
    &:mouseover ${GridLink} {
      border-bottom: solid;
      border-color: red;
    }
`
const DropdownStyle = styled.div`
    position: absolute;
`
const SearchContainer = styled.div`
    
`

const StyledBurger = styled(LunchDiningIcon)({
  paddingRight: '10px'
})

const StyledPizza = styled(LocalPizzaIcon)({
  paddingRight: '10px'
})

const StyledPlumber = styled(PlumbingIcon)({
  paddingRight: '10px'
})

const StyledLandscaper = styled(YardIcon)({
  paddingRight: '10px'
})

const StyledBike = styled(TwoWheelerIcon)({
  paddingRight: '10px'
})

const StyledMechanic = styled(MinorCrashIcon)({
  paddingRight: '10px'
})

const StyledMusic = styled(PianoIcon)({
  paddingRight: '10px'
})

const StyledDance = styled(SportsGymnasticsIcon)({
  paddingRight: '10px'
})

let restaurantLink = 'restaurant';
function Navbar() {

    const [inputText, setInputText] = useState("");

    const [allBusinesses, setAllBusinesses] = useState([]);

    useEffect(() => {
        const getAll = async() => {
            let results = await kudos.get(`/api/business/searchAll`);
            console.log(results.data)

            setAllBusinesses(results.data);
        }
        getAll()
    }, [])

    const onSearch = (name) => {
        setInputText(name);
        console.log(`heres the thing you searched for: ${name}`);
    }

    return (
    <div>
      <NavContainer>
        <LogoNavLink>
          <Link to='/'>
              <div id="headtag"><img src="/kudos.png" alt="Home"/></div>
          </Link>
        </LogoNavLink>
        <SearchContainer>
          <SearchBar inputText={inputText} setInputText={setInputText} />
          <DropdownStyle>
          {allBusinesses.length > 0 && inputText.length > 0 ?
            <SearchList inputText={inputText} setInputText={setInputText} data={allBusinesses} onSearch={onSearch} /> 
            : 
          ''}
          </DropdownStyle>
        </SearchContainer>

        <TopNavLinks>
          <Link to="/AddBusiness" className="Link" >For Business</Link>
        </TopNavLinks>
        <TopNavLinks>
          <Link to="/ReviewsPage"  className="Link" >Write a Review</Link>
        </TopNavLinks>
        <TopNavLinks>
          <Link to="/Profile">
            <AccountCircleIcon style={{color: 'white'}}/>
          </Link>
        </TopNavLinks>
      </NavContainer>
      <LowerNavContainer>
        <FirstNavLink>
          <GridLink>
            <Link to={`/${restaurantLink}`} className="Link" >Restaurants</Link>
            <ExpandMoreIcon />
          </GridLink>
          <DropDownContent>
            <DropDownGrid>
              <StyledBurger />
              <Link to="/burger" className="dropLink" >Burgers</Link>
            </DropDownGrid>
            <DropDownGrid>
              <StyledPizza />
              <Link to="/pizza" className="dropLink" >Pizza</Link>
            </DropDownGrid>
          </DropDownContent>
        </FirstNavLink>
        <SecondNavLink>
          <GridLink>
            <Link to="/home" className="Link" >Home&nbsp;Services</Link>
            <ExpandMoreIcon />
          </GridLink>
          <DropDownContent>
            <DropDownGrid>
              <StyledPlumber />
              <Link to="/plumber" className="dropLink" >Plumbers</Link>
            </DropDownGrid>
            <DropDownGrid>
              <StyledLandscaper />
              <Link to="/landscaper" className="dropLink" >Landscapers</Link>
            </DropDownGrid>
          </DropDownContent>
        </SecondNavLink>
        <ThirdNavLink>
          <GridLink>
            <Link to="/auto" className="Link" >Auto&nbsp;Services</Link>
            <ExpandMoreIcon />
          </GridLink>
          <DropDownContent>
            <DropDownGrid>
              <StyledBike />
              <Link to="/bike" className="dropLink" >Bikes</Link>
            </DropDownGrid>
            <DropDownGrid>
              <StyledMechanic />
              <Link to="/mechanic" className="dropLink" >Mechanics</Link>
            </DropDownGrid>
          </DropDownContent>
        </ThirdNavLink>
        <FourthNavLink>
          <GridLink>
            <Link to="/more" className="Link" >More</Link>
            <ExpandMoreIcon />
          </GridLink>
          <DropDownContent>
            <DropDownGrid>
              <StyledMusic />
              <Link to="/music" className="dropLink" >Music Lessons</Link>
            </DropDownGrid>
            <DropDownGrid>
              <StyledDance />
              <Link to="/dance" className="dropLink" >Dance Lessons</Link>
            </DropDownGrid>
          </DropDownContent>
        </FourthNavLink>
      </LowerNavContainer>

    </div>
    );
}

export default Navbar;