import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../index.css";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";
const {
  MarkerClusterer,
} = require("react-google-maps/lib/components/addons/MarkerClusterer");

// withGoogleMap takes a react component and returns one. We call these "Higher Order Components"
const MyMap = withScriptjs(
  withGoogleMap((props) => {
    return (
      <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 39.7392, lng: -98.9903 }}
        onClick={() => {
          props.setShowingInfoWindow(false);
        }}
      >
        {/* <MarkerClusterer
          onClick={props.onMarkerClustererClick}
          averageCenter
          gridSize={60}
        > */}
        {props.markers.map((marker) => {
          if (props.showMarkerOrNot(marker)) {
            return (
              <Marker
                key={marker.id}
                {...marker}
                onClick={() => {
                  props.onMarkerClick(marker);
                }}
              />
            );
          }
          return "";
        })}
        {/* </MarkerClusterer> */}

        {props.showingInfoWindow ? (
          <InfoWindow
            onCloseClick={() => {
              props.setShowingInfoWindow(false);
            }}
            position={props.clickedMarkerInfo.position}
          >
            <div className="infopoint">
              <div>
                <strong>Site Information</strong>

                <p>
                  <span>{props.clickedMarkerInfo.name} </span>
                </p>
                <p>{props.clickedMarkerInfo.phone}</p>
              </div>
              <br />
              <div>
                <strong>Gas Prices</strong>
                <p>
                  <span>Unleaded: </span>
                  {` USD ${props.clickedMarkerInfo.gas.unleaded}`}
                </p>
                <p>
                  <span>Midgrade: </span>
                  {` USD ${props.clickedMarkerInfo.gas.midgrade}`}
                </p>
                <p>
                  <span>Premium: </span>
                  {` USD ${props.clickedMarkerInfo.gas.premium}`}
                </p>
              </div>
              <br />
              <div>
                <h4>Amenities</h4>
                <div className="amenities">
                  {props.clickedMarkerInfo.amenities.map((amenity, i) => {
                    if (i === props.clickedMarkerInfo.amenities.length - 1) {
                      return `${amenity}`;
                    }
                    return `${amenity}, `;
                  })}
                </div>
              </div>
            </div>
          </InfoWindow>
        ) : (
          ""
        )}
      </GoogleMap>
    );
  })
);

// We use object destructuring here to shorten our code
export default function Map({
  locations,
  getLocations,
  showType,
  showState,
  showCity,
  showHasRestaurant,
  showHasAmenities,
}) {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [clickedMarkerInfo, setClickedMarkerInfo] = useState({});

  const onMarkerClick = (marker) => {
    setClickedMarkerInfo(marker);
    setShowingInfoWindow(true);
  };

  const hasAllAmenities = (chosenAmenities, markerAmenities) => {
    return chosenAmenities.every((amenity) =>
      markerAmenities.includes(amenity)
    );
  };

  const showMarkerOrNot = (marker) => {
    if (showType !== "All" && showType !== marker.siteType) return false;
    if (showState !== "All" && showState !== marker.state) return false;
    if (showCity !== "All" && showCity !== marker.city) return false;
    if (
      showHasRestaurant !== "All" &&
      !marker.restaurants.includes(showHasRestaurant)
    )
      return false;
    if (
      showHasAmenities.length !== 0 &&
      !hasAllAmenities(showHasAmenities, marker.amenities)
    )
      return false;
    return true;
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <MyMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GMAPKEY}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div id="loading-element" style={{ height: `100%` }} />}
      className="mymap"
      containerElement={<div id="container-element" />}
      mapElement={<div style={{ height: `100%` }} />}
      markers={locations}
      onMarkerClick={onMarkerClick}
      clickedMarkerInfo={clickedMarkerInfo}
      showingInfoWindow={showingInfoWindow}
      setShowingInfoWindow={setShowingInfoWindow}
      showMarkerOrNot={showMarkerOrNot}
    />
  );
}

// This looks new? Can you guess what this does?
Map.propTypes = {
  getLocations: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};
