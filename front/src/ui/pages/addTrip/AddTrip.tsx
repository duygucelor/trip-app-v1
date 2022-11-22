import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../core/authorization/useCases/currentUser";
import { CreateTrip } from "../../../core/trip/domain/trip";
import {createTrip} from "../../../core/trip/useCases/createTrip";
import { useAppDispatch } from "../../../store";
import { TripForm } from "./components/TripForm";

const AddTrip = () => {
  const dispatch = useAppDispatch();
  const user = useSelector(currentUserSelector);
  const handleCreate = (data: CreateTrip) => {
    dispatch(
      createTrip({
        username: user?.username ?? "",
        country: data.country,
        coordinates: data.coordinates,
        city: data.city,
        status: data.status,
        arrivalDate: data.arrivalDate ?? "",
        departureDate: data.departureDate ?? "",
      })
    );
  };

  return (
    <div>
      <TripForm onDataChange={handleCreate}></TripForm>
    </div>
  );
};
export default AddTrip;
