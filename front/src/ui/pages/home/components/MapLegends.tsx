import React from "react";
import { colors } from "../../../constants/colors";
import { Box, Divider } from "@mui/material";
import { TripStatus } from "../../../../core/trip/domain/trip";
import MapLegendItem from "./MapLegendItem";
import FlagIcon from "@mui/icons-material/Flag";
import { ListItem } from "../../../globalComponents/common/ListItem";
const MapLegends = () => {
  const statusArray: string[] = [];
  Object.keys(TripStatus).map((status) => statusArray.push(status));
  return (
    <Box
      sx={{
        my: "20px",
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-end",
      }}
    >
      <ListItem>
        <FlagIcon style={{ fill: colors.visitedCountry }} />
        <span>Visited Counties</span>
      </ListItem>
      <ListItem>
        <FlagIcon style={{ fill: colors.wishToVisitCountries }} />
        <span>Wish-Listed Counties</span>
      </ListItem>
      <Divider variant="middle" sx={{ my: "10px" }} />
      {statusArray.map((status) => (
        <MapLegendItem status={status} key={status} />
      ))}
    </Box>
  );
};
export default MapLegends;
