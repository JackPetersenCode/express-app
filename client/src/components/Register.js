import React, {useState, useEffect} from "react";
import kudos from "../apis/kudos.js";
import { Form, Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../pages/NavBar";

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
`
const FormDiv = styled.div`
    text-align: center;
    margin: 20px;
`
const Flower = styled.img`
    width: 75px;
    height: 75px;
`
const StyledInput = styled.input`
    width: 400px;
    padding: 15px;
    font-size: large;
    border-radius: 10px;
    border-width: 5px;
`
const StyledButton = styled.button`
    width: 440px;
    padding: 15px;
    font-size: large;
    border-radius: 10px;
    border-width: 5px;
    color: white;
    border-color: rgb(48, 48, 48);
    background-color: rgb(48, 48, 48);
`

const Register = ({ profile, setProfile }) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [messages, setMessages] = useState([]);

    const register = async() => {
        console.log(name);
        let results = await kudos.post(`/api/users/register`, {
                                                                name: name,
                                                                email: email,
                                                                password: password,
                                                                password2: password2
                                                            })

        console.log(results.data)

        if (results.data[0].message) {
            console.log('whistle')
            setMessages(results.data);
            navigate('/Register')
        } else {
            console.log('yoyo')
            navigate('/Login');
        }                                                        
    }

    return (
        <BusinessesBackground>
            <Navbar />
            <div>
                <FormDiv>
                    <Flower src="/flower2.png" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="username" id="name" name="name" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={email} onChange={(e) => setEmail(e.target.value)}
                        type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                </FormDiv>
                <FormDiv>
                    <StyledInput value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="********" id="password2" name="password2" />
                </FormDiv>
                <FormDiv>
                    <StyledButton onClick={register}>Register</StyledButton>    
                </FormDiv>
                <FormDiv>
                    <Link to="/Login">
                        <StyledButton>Registered already? Log in.</StyledButton>
                    </Link>    
                </FormDiv>
            </div>
            <div>{messages.map((message, index) => (
                <div key={index}>{message.message}</div>
            ))}
            </div>
        </BusinessesBackground>
    )
}

export default Register;