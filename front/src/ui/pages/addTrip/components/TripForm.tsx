import { Alert, Box, Button, CircularProgress, styled } from "@mui/material";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../../globalComponents/common/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../../store";
import {
  errorSelector,
  resetCreateTrip,
  statusSelector,
} from "../../../../core/trip/useCases/createTrip";
import { SearchMap } from "./SearchMap";
import { InputDate } from "../../../globalComponents/form/InputDate";
import { Input } from "../../../globalComponents/form/Input";
import Select, { Option } from "../../../globalComponents/form/Select";
import {
  getTripStatusLabel,
  TripStatus,
} from "../../../../core/trip/domain/trip";
import { useEffect, useState } from "react";

interface TripFormProps {
  onDataChange(data: any): void;
}
const FlexRow = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
`;

export const TripForm: React.FC<TripFormProps> = ({ onDataChange }) => {
  const { control, handleSubmit, setValue, watch, reset } = useForm<{
    country: string;
    city: string;
    coordinates: [number, number];
    arrivalDate?: string;
    departureDate?: string;
  }>();

  const onSubmit = handleSubmit((data) => {
    onDataChange(data);
    reset();
  });
  const dispatch = useAppDispatch();
  const status = useAppSelector(statusSelector);
  const error = useAppSelector(errorSelector);
  const [showAlert, setShowAlert] = useState(false);

  const coor = watch("coordinates");
  const statusOptions: Option[] = [];
  Object.keys(TripStatus).map((status) =>
    statusOptions.push({ value: status, label: getTripStatusLabel(status) })
  );

  useEffect(() => {
    if (status === "SUCCESS") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      dispatch(resetCreateTrip());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
  return (
    <>
      {showAlert && <Alert severity="success">Your trip is added!</Alert>}
      <form onSubmit={onSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            gap: "10px",
            m: "20px",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <SearchMap setValue={setValue} />
          </Box>
          <Box
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <h3>Search your destination on map and add your trip</h3>
            <FlexRow>
              <Input
                control={control}
                label="Country"
                name="country"
                disabled={true}
              />
              <Input
                control={control}
                label="City"
                name="city"
                disabled={true}
              />
            </FlexRow>
            <FlexRow>
              <InputDate
                control={control}
                label="Arrival date"
                name="arrivalDate"
              />
              <InputDate
                control={control}
                label="Departure date"
                name="departureDate"
              />
            </FlexRow>
            <Select
              options={statusOptions}
              control={control}
              name="status"
              placeholder="Status"
              label="Status"
              required
            />
            <Button
              type="submit"
              disabled={status === "PENDING" || !coor}
              variant="contained"
              color="primary"
              sx={{
                width: "50%",
              }}
            >
              Add
              {status === "PENDING" && (
                <CircularProgress color="inherit" size="1rem" />
              )}
            </Button>
          </Box>
        </Box>
        {status === "ERROR" && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </>
  );
};
