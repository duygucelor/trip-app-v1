import { useEffect } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../../core/authorization/useCases/currentUser";
import {getUserTrips} from "../../../core/trip/useCases/getUserTrips";
import { tripsSelector } from "../../../core/trip/useCases/trips";
import { useAppDispatch } from "../../../store";
import { FlexRow } from "../../globalComponents/templates/FlexRow";
import MapChart from "./components/MapChart";
import MapLegends from "./components/MapLegends";

const Home = () => {
  const dispatch = useAppDispatch();
  const username = useSelector(currentUserSelector)?.username;
  const trips = useSelector(tripsSelector)
  useEffect(() => {
    if(username && trips){
      dispatch(getUserTrips(username))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]); 

  return (
    <FlexRow>
      <MapChart trips={trips}></MapChart>
      <MapLegends/>
    </FlexRow>
  )
}
export default Home
