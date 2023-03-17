import React, {useState} from 'react';
import { GoogleApiWrapper, Marker, Map } from 'google-maps-react';
import Geocode from "react-geocode";
import { DirectionsService, DirectionsRenderer } from '@react-google-maps/api';


const mapStyle = {
    width: '500px',
    height: '500px',
    boxShadow: '0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48), 0 0 10px rgba(48, 48, 48)',
    borderRadius: '5px'
}

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

const MapContainer = ({ address, google}) => {

    console.log(address)
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    Geocode.fromAddress(address).then(
        (response) => {
          const { lat, lng } = response.results[0].geometry.location;
          console.log(lat, lng);
          setLatitude(lat);
          setLongitude(lng);
          
        },
        (error) => {
          console.error(error);
        }
    );

    const directionsService = new google.maps.DirectionsService();
    const [map, setMap] = useState(/** @type google.maps.Map */ (null));

    console.log(map)
    return (
        <>
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
          >
            <Marker position={{lat: latitude, lng: longitude}} />
            <DirectionsService options={{  origin: 'boston', destination: 'new york', travelMode: 'DRIVING' }} />
          </Map>
        }
        </>
    )
}


export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapContainer)