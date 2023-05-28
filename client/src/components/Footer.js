import React from 'react';
import { FaCopyright, FaGithub } from 'react-icons/fa';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {BsLinkedin} from "react-icons/bs";

const gitStyle = () => ({
    verticalAlign: 'bottom',
})

const iconStyle = () => ({
    color: "rgb(238,238,238)",
    padding: "5px",
    paddingBottom: "0px",
})

const grayStyle = () => ({
    color: "rgb(98,98,98)",
    padding: "5px",
    paddingBottom: "0px",
})

const icon = () => ({
    color: "rgb(238,238,238)",
})

const gray = () => ({
    color: "rgb(98,98,98)",
})

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`
const LinksFlex = styled.div`
    display: flex;
    align-items: top;
`
const TextDiv = styled.div`
`

const Footer = ({styleProps}) => {
    return (
        <FooterContainer>
            <LinksFlex>
                <Link to="https://www.linkedin.com/in/JackPetersenCode" style={styleProps ? grayStyle() : iconStyle()} >
                    <BsLinkedin size={50}/>
                </Link>
                <Link to="https://www.github.com/JackPetersenCode/express-app" style={styleProps ? grayStyle() : iconStyle()} >
                    <FaGithub size={50} />
                </Link>
            </LinksFlex>
            <TextDiv style={styleProps ? gray() : icon()}>
                &copy; 2023 | JackPetersenCode
            </TextDiv>
        </FooterContainer>
    )
}

export default Footer;