import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { useState, useRef, useCallback } from "react";
import MapGL, { MapRef } from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

export const SearchMap = ({setValue}:{setValue: any}) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN
  const [viewport, setViewport] = useState({
    latitude: 40,
    longitude: 20,
    zoom: 3,
  });
  const mapRef = useRef<MapRef>(null);
  const handleViewportChange = useCallback(
    (newViewport: any) => setViewport(newViewport),
    []
  );
  const handleOnResult = useCallback((event:any) => {
      setValue("coordinates", event.result.geometry.coordinates)
      setValue("country", event.result.place_name.split(",").pop())
      setValue("city", event.result.text)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <div style={{ height: "100vh" }}>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="70vh"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >

        <Geocoder
          mapRef={mapRef}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          position="top-left"
          language="en-GB"
          onResult={handleOnResult}
          marker={true}
        />
      </MapGL>
    </div>
  );
};
