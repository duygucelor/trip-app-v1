import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import Trip, {
  getMarkerColor,
  TripStatus,
} from "../../../../core/trip/domain/trip";
import { colors } from "../../../constants/colors";
import data from "../../../constants/features.json";
import { useStaticMapMarkerSize } from "../../../globalComponents/hooks/mapHooks";
import "./styles.css";

const MapChart = ({ trips }: { trips: Trip[] }) => {
  const initialScaleFactor = 4.6;
  const [scaledMarkerRadius, setScaleFactor] = useStaticMapMarkerSize(
    1.5,
    initialScaleFactor
  );
  const [position, setPosition] = useState({ coordinates: [0, 0], zoom: 1.2 });
  const handleMoveEnd = (
    position: React.SetStateAction<{ coordinates: number[]; zoom: number }>
  ) => {
    setPosition(position);
  };

  const visitedCountries: string[] = [];
  const wishListedCountries: string[] = [];

  trips.forEach((trip) => {
    if (
      (trip.status === TripStatus.alreadyVisited ||
        trip.status === TripStatus.lived) &&
      !visitedCountries.includes(trip.country)
    ) {
      visitedCountries.push(trip.country);
    } else if (
      (trip.status === TripStatus.plannedTrip ||
        trip.status === TripStatus.wishToVisit) &&
      !visitedCountries.includes(trip.country) &&
      !wishListedCountries.includes(trip.country)
    ) {
      wishListedCountries.push(trip.country);
    }
  });

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
                const colorCode =
                  (visitedCountries.includes(geo.properties.name) &&
                    colors.visitedCountry) ||
                  (wishListedCountries.includes(geo.properties.name) &&
                    colors.wishToVisitCountries) ||
                  "";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colors.countryDefault}
                    style={{
                      hover: {
                        fill: "#AAA",
                        stroke: "#FFF",
                        strokeWidth: 0.3,
                        outline: "none",
                      },
                      default: {
                        fill: colorCode ?? colors.countryDefault,
                        stroke: "#FFF",
                        strokeWidth: 0.05,
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
          {trips &&
            trips.length > 0 &&
            trips.map(({ id, coordinates, status }) => (
              <Marker key={id} coordinates={coordinates}>
                <circle r={scaledMarkerRadius} fill={getMarkerColor(status)} />
              </Marker>
            ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
export default MapChart;
