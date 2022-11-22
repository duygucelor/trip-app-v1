import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import Trip from "../../../../core/trip/domain/trip";
import data from "../../../constants/features.json";
import { useStaticMapMarkerSize } from "../../../globalComponents/hooks/mapHooks";

import "./styles.css";

const MapChart = ({ trips }: { trips: Trip[] }) => {
  const initialScaleFactor = 1;
  const [scaledMarkerRadius, setScaleFactor] = useStaticMapMarkerSize(
    3,
    initialScaleFactor
  );
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1.2 });
  const handleMoveEnd = (
    position: React.SetStateAction<{ coordinates: number[]; zoom: number }>
  ) => {
    setPosition(position);
  };
  return (
    <div className="map">
      <ComposableMap>
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates as [number, number]}
          onMoveEnd={handleMoveEnd}
          onMove={({ zoom }) => setScaleFactor(zoom)}
        >
          <Geographies geography={data}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      hover: {
                        fill: "#AAA",
                        stroke: "#FFF",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                      default: {
                        fill:  "#273c69",
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {trips && trips.length>0 &&
            trips.map(({ id, coordinates }) => (
              <Marker
                key={id}
                coordinates={coordinates}
              >
                <circle r={scaledMarkerRadius} fill="#F53" />
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
export default MapChart;
