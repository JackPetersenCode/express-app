import React, { useEffect, useState } from "react";
import Navbar from "./NavBar";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import kudos from "../apis/kudos";
import Footer from "../components/Footer";

const FormDiv = styled.div`
    text-align: center;
`

const StyledInput = styled.textarea`
    width: 80vw;
    height: auto;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    font-size: 16px;
    box-shadow: 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48),
    0 0 10px rgba(48, 48, 48);
    margin: 10px;
`

const BusinessesBackground = styled.div`
    background-image: linear-gradient(180deg, black, white);
    width: 100%;
    min-height: 100vh;

`
const StyledTitle = styled.div`
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.8), 0 0 10px rgba(0, 0, 0, 0.8),
    0 0 10px rgba(0, 0, 0, 0.8);
    font-size: x-large;
    margin-top: 20px;
`
const CreatePageButton = styled.button`
    margin-top: 20px;
    margin-bottom: 50px;
    background-color: red;
    padding: 10px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 5px;
    border: none;
    color: white;
`
const ButtonDiv = styled.div`

`
const FooterDiv = styled.div`
    width: 100%;  
`


const AddBusiness = ({ profile }) => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState([]);
    const [address, setAddress] = useState('');
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [errors, setErrors] = useState(false);

    const createBusiness = async() => {

        if (!name) {
            alert('Must include business name!')
            return;
        }
        const formData = new FormData();
        formData.append('photo', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        const url = `/api/business/image`;

        kudos.post(url, formData, config)
            .then((response) => {
                let databaseImages = images.map((image) => '/' + image.name)
                kudos.post(`/api/business`, { name: name,
                                                description: description,
                                                tags: tags,
                                                images: databaseImages,
                                                address: address,
                                                email: profile.email
                                            })
                    .then((response) => {
                        console.log('Business created successfully')
                        alert('Business Created Successfully! Use search bar to find your page.');
                        navigate('/');
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            .catch((error) => {
                alert('Only Image Uploads Allowed...');
                setImages([]);
                setErrors(true);
                console.log('error', error)
            })             
    }


    const onInputChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        //images.push(e.target.files[0]);
        setImages([...images, e.target.files[0]]);
    }

    return (
        <>
        <BusinessesBackground>
            <Navbar />
            <FormDiv>
                <StyledTitle>Enter Your Business Information:</StyledTitle>
                <FormDiv>
                    <textarea className="styled-input" value={name} onChange={(e) => {
                        e.target.setAttribute('size', e.target.value.length);
                        setName(e.target.value)}}
                            type="name" placeholder="Your Business Name Here" id="name" name="name" />
                </FormDiv>
                <FormDiv>
                    <textarea className="styled-input description" value={description} onChange={(e) => {
                        e.target.setAttribute('size', e.target.value.length);
                        setDescription(e.target.value)}}
                            type="description" placeholder="Your Business Description Goes Here" id="description" name="description" />
                </FormDiv>
                <FormDiv>
                    <textarea className="styled-input" value={address} onChange={(e) => {
                        e.target.setAttribute('size', e.target.value.length);
                        setAddress(e.target.value)}}
                            type="address" placeholder="Your Business Address Here" id="address" name="address" />
                </FormDiv>
                <FormDiv>
                    <textarea className="styled-input" value={tags} onChange={(e) => {
                        e.target.setAttribute('size', e.target.value.length);
                        setTags(e.target.value.toLowerCase().split(','))}}
                            type="tags" placeholder="Enter comma-separated search tags, include business name" id="tags" name="tags" />
                </FormDiv>
                <FormDiv>
                    <h3>Upload Business Images:</h3>
                    <input type="file" name="photo" onChange={onInputChange} />
                    {images.map((image, index) => (
                        <div key={index}>{image.name}</div>
                    ))}
                </FormDiv>
                <ButtonDiv>
                    <CreatePageButton onClick={createBusiness}>Create Your Page</CreatePageButton>
                </ButtonDiv>
            </FormDiv>
        </BusinessesBackground>
        <FooterDiv>
            <Footer styleProps={true} />
        </FooterDiv>
        </>
    )
}

export default AddBusiness;