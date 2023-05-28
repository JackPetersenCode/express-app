import React, {useState} from 'react';
import { GoogleApiWrapper, Marker, Map } from 'google-maps-react';
import Geocode from "react-geocode";
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';


const mapStyle = {
  width: '100%',
  height: '75%',
}

const Width100 = styled.div`
  padding-top: 20px;
`



Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const MapContainer = ({ address, google}) => {

    const mapContainerStyle = {
      width: useMediaQuery({ maxWidth: 768 }) ? '90%' : 'calc(50% - 40px)',
      marginLeft: useMediaQuery({ maxWidth: 768 }) ? '5%' : '0%',
    }

    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          setLatitude(lat);
          setLongitude(lng);
          
        },
        (error) => {
          console.error(error);
        }
    );

    const directionsService = new google.maps.DirectionsService();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    const getTheCenter = () => {
      var currCenter = map.getCenter();
      google.maps.event.trigger(map, 'resize');
      map.setCenter(currCenter);
    };

    return (
        <Width100>
        {latitude === 0 && longitude === 0 ? '' :
          <Map id='map'
          google={google}
          initialCenter = {
              {
                  lat: latitude,
                  lng: longitude
              }
          }
          style={mapStyle}
          onReady={(map) => setMap(map)}
          containerStyle={mapContainerStyle}
          >
            <Marker position={{lat: latitude, lng: longitude}} />
            <DirectionsService options={{  origin: 'boston', destination: 'new york', travelMode: 'DRIVING' }} />
          </Map>
        }
        </Width100>
    )
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)