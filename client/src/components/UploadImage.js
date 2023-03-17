import React, { useState, useEffect } from "react";
import styled from "styled-components";
import kudos from "../apis/kudos.js";

const UploadImage = ({ images, setImages, name }) => {

    const [file, setFile] = useState(null);

    const onFormSubmit = (e) => {
        e.preventDefault();
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
                alert('Image Uploaded Successfully!');
            })
            .catch((error) => {
                console.log('error', error)
            })
        
    }

    const onInputChange = (e) => {
        e.preventDefault();
        setFile(e.target.files[0]);
        console.log(e.target.files[0])
        setImages([...images, e.target.files[0]]);
        console.log(images);
    }

    return (
        <div>
                <input type="file" name="photo" onChange={onInputChange} />
                <button onClick={onFormSubmit}>Upload Image</button>
            
        </div>
    )
}

export default UploadImage;