import React from "react";
import { Box } from "@mui/material";
import {
  getMarkerColor,
  getTripStatusLabel,
} from "../../../../core/trip/domain/trip";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import { ListItem } from "../../../globalComponents/common/ListItem";
const MapLegendItem = ({ status }: { status: string }) => {
  return (
    <ListItem>
      <CircleRoundedIcon style={{ fill: getMarkerColor(status) }} />
      <span>{getTripStatusLabel(status)}</span>
    </ListItem>
  );
};
export default MapLegendItem;
