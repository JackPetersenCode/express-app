import { React, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const DropdownStyle = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 10px;
    text-align: left;
    min-width: 230px;
    border-radius: 5px;
    position: absolute;
    z-index: 20;
`

const DropdownRowStyle = styled.div`
    cursor: pointer;
    margin: 2px 0;
    padding-left: 3px;
    padding-right: 3px;
`
const StyledDiv = styled.div`
    background-color: white;
    padding: 10px;
    text-align: left;
    min-width: 230px;
    border-radius: 5px;
    z-index: 20;

    
`
const StyledOption = styled.div`

`
 
function SearchList({ inputText, setInputText, data, reviewsList, selectedBusiness, setSelectedBusiness }) {
    //create a new array by filtering the original array
    
    function useOutsideAlerter(ref) {
        useEffect(() => {
            /**
             * Alert if clicked on outside of element
             */
            function handleClickOutside(event) {
              if (ref.current && !ref.current.contains(event.target)) {
                    setInputText('');
              }
            }
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
              // Unbind the event listener on clean up
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, [ref]);
    }

    const refOne = useRef(null);
    useOutsideAlerter(refOne)

    const filteredData = data.filter((element) => {
        //if no input the return the original
        //return the item which contains the user input
        return element.name.toLowerCase().includes(inputText);
        
    })

    function handleList(name) {
        setSelectedBusiness(name);
        setInputText('');
        console.log(name)
    }


    return (
      <div ref={refOne} >
      { !reviewsList ?

      <DropdownStyle>
        {filteredData.map((item, index) => (
        <Link key={index} to={`/${item.name}`} style={{textDecoration: 'none'}}><DropdownRowStyle>{item.name}</DropdownRowStyle></Link>
        ))}
      </DropdownStyle>
      
      :
      
      <StyledDiv>
        {filteredData.map((item, index) => (
            <StyledOption key={index} onClick={() => handleList(item.name)} >{item.name}</StyledOption>
        ))}
      </StyledDiv>
      }
      </div>
    )
}

export default SearchList;