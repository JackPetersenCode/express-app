import React, {useState, useEffect} from "react";
import kudos from "../apis/kudos.js";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../pages/NavBar";
import Footer from "./Footer.js";

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 100vh;
`
const FormDiv = styled.div`
    text-align: center;
    margin: 20px;
`
const Flower = styled.img`
    width: 29px;
    height: 31px;
`
const StyledInput = styled.input`
    width: 80vw;
    height: auto;
    max-width: 500px;
    padding: 15px;
    font-size: large;
    border-radius: 10px;
    border-width: 5px;
`
const StyledButton = styled.button`
    padding: 15px;
    font-size: large;
    border-radius: 10px;
    border-width: 5px;
    color: white;
    border-color: rgb(48, 48, 48);
    background-color: rgb(48, 48, 48);
`
const StyledButtonRegister = styled.button`
    padding: 15px;
    font-size: large;
    border-radius: 10px;
    color: white;
    border-width: 5px;
    border-color: rgb(48, 48, 48);
    background-color: rgb(48, 48, 48);
`
const FooterDiv = styled.div`
    width: 100%;
    
`

const Login = ({ profile, setProfile }) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [messages, setMessages] = useState([]);

    const login = async() => {
        let results = await kudos.post(`/api/users/login`, {
                                                                email: email,
                                                                password: password,
                                                            })

        console.log(results)
        if (!results.data.id) {
            console.log('login failure')
            setMessages(results.data)
            navigate('/Login');
        } else {
            //setLoginStatus(true);
            setProfile(results.data)
            navigate('/');
        }                                                        
    }

    return (
        <>
            <BusinessesBackground>
                <Navbar />
                <FormDiv>
                    <Flower src="/newLogo.png" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={email} onChange={(e) => setEmail(e.target.value)}
                            type="email" placeholder="Email" id="email" name="email" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" />
                </FormDiv>
                <FormDiv>
                    <StyledButton onClick={login}>Log in</StyledButton>        
                </FormDiv>
                <FormDiv>
                    <Link to="/Register">
                        <StyledButtonRegister>Don't have an account? Register here.</StyledButtonRegister>
                    </Link>
                </FormDiv>
                <FormDiv>{messages.map((message, index) => (
                        <div key={index}>{message.message}</div>
                    ))}
                </FormDiv>
            </BusinessesBackground>
            <FooterDiv>
                <Footer styleProps={true} />
            </FooterDiv>
        </>
    )
}

export default Login;