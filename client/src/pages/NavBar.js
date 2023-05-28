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
import MediaQuery from 'react-responsive';
import { MdDining } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { AiFillCar } from "react-icons/ai";
import { CgMoreO } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoBusiness } from "react-icons/io5";


const NavContainer = styled.nav`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    @media screen and (max-width: 768px) {
      padding-top: 10px;
      padding-bottom: 10px;
    }
`

const LowerNavContainer = styled.nav`
    display: flex;
    margin-left: 160px;
    color: white;
`

const TopNavLinks = styled.div`
  
    text-align: center;
    width: 100%;
    @media screen and (max-width: 768px) {
      text-align: left;
    }

`

const LogoNavLink = styled.div`
    text-align: center;
    padding: 10px;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
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
    align-items: center;
    flexWrap: wrap;
`

const FirstNavLink = styled.div`

    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }
    

  `

const DropDownGrid = styled.div`
  padding: 5px;
  display: flex;
  alignItems: center;
  flexWrap: wrap;
`

const SecondNavLink = styled.div`
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }

  `

const ThirdNavLink = styled.div`
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }

  `

const FourthNavLink = styled.div`
    &:hover ${DropDownContent} {
      display: flex;
    }
    &:mouseover ${DropDownContent} {
      display: flex;
    }

`
const DropdownStyle = styled.div`
    position: absolute;
`
const SearchContainer = styled.div`
    width: 100%;
    max-width: 500px;

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

const StyledDining = styled(MdDining)({
  
})
const StyledHome = styled(FaHome)({

})
const StyledCar = styled(AiFillCar)({

})
const StyledCircleIcon = styled(CgMoreO)({

})

const LinkFlex = styled.div`
  display: flex;
  width: 100%;
  max-width: 500px;
  align-items: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
const LogoAndBarFlex = styled.div`
  display: flex;
  width: 100%;
`
const PhoneNavFlex = styled.div`
  display: flex;
  padding-bottom: 20px;
`
const PhoneLink = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  justify-content: top;
`
const PhoneLogoFlex = styled.div`
  display: flex;
`
const HamburgerContainer = styled.div`
  width: 100%;
  text-align: right;
`
const HiddenDiv = styled.div`
  width: 100%;
`
const BigNavWrap = styled.div`
  @media screen and (max-width: 768px) {
    background-color: red;
  }
`
const PhoneSearchContainer = styled.div`
  padding: 20px;
  padding-top: 0px;
`
const BurgerLinks = styled.div`
  position: absolute;
  right: 0px;
  left: 0px;
  top: 75px;
  color: black;
  background-color: white;
  z-index: 20;
`
const BurgerLinksContainer = styled.div`

`
const ProfileText = styled.div`
  color: rgb(100,100,100);
  margin-left: 5px;
`
const ProfileFlex = styled.div`
  display: flex;
  flex-wrap: nowrap;
`
const FlowerDiv = styled.div`
`
const FlowerImg = styled.img`
  width: 22px;
  height: 22px;
`
const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: rgb(238,238,238);
`

let restaurantLink = 'restaurant';
function Navbar() {

    const [inputText, setInputText] = useState("");
    const [allBusinesses, setAllBusinesses] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);

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
    <BigNavWrap>
      <NavContainer>
        <MediaQuery maxWidth={768}>
        <HiddenDiv>

        </HiddenDiv>
        </MediaQuery>
        <LogoAndBarFlex>
          <LogoNavLink>
            <Link to='/'>
                <img src="/kudos2.png" alt="Home"/>
            </Link>
          </LogoNavLink>
          <SearchContainer>
            <SearchBar allBusinesses={allBusinesses} inputText={inputText} setInputText={setInputText} />
          </SearchContainer>
        </LogoAndBarFlex>
        
        <LinkFlex>
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
        </LinkFlex>

        <MediaQuery maxWidth={768} >
        <HamburgerContainer>
            <GiHamburgerMenu onClick={() => setIsExpanded(!isExpanded)} size={40} />
        </HamburgerContainer>
        <div className={isExpanded ? "expanded" : "notExpanded"}>
          <BurgerLinks>

            <TopNavLinks>
              <Link to="/Profile" className="burger-link">
                <AccountCircleIcon className="profile-icon"/>
                <ProfileText>
                  Profile
                </ProfileText>
              </Link>
            </TopNavLinks>
            <Line></Line>

            <TopNavLinks>
              <Link to="/ReviewsPage"  className="burger-link" >
                <FlowerDiv>
                  <FlowerImg src="/flower4.png" />
                </FlowerDiv>
                <ProfileText>
                  Add a Review
                </ProfileText>
                
              </Link>
            </TopNavLinks>
            <Line></Line>

            <TopNavLinks>
              <Link to="/AddBusiness" className="burger-link" >
                <IoBusiness size={22} />
                <ProfileText>
                  Add Your Business
                </ProfileText>
              </Link>
            </TopNavLinks>

          </BurgerLinks>
        </div>
        </MediaQuery>
      </NavContainer>
      <MediaQuery minWidth={769}>
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
      </MediaQuery>
      <MediaQuery maxWidth={768}>
 
      <PhoneNavFlex>
          <PhoneLink>
            <Link to={`/${restaurantLink}`} className="Link" >
              <StyledDining size={50} />
              <div>Restaurants</div>
            </Link>
          </PhoneLink>
          <PhoneLink>
            <Link to="/home" className="Link" >
              <StyledHome size={50} />
              <div>Home Services</div>
            </Link>
          </PhoneLink>
          <PhoneLink>
            <Link to="/auto" className="Link" >
              <StyledCar size={50} />
              <div>Auto Services</div>
            </Link>
          </PhoneLink>
          <PhoneLink>
            <Link to="/more" className="Link" >
              <StyledCircleIcon size={50} />
              <div>More</div>
            </Link>
          </PhoneLink>
      </PhoneNavFlex>
      </MediaQuery>




    </BigNavWrap>
    );
}

export default Navbar;