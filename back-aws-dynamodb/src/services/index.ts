import dynamoDBClient from "../models/database";
import TripService from "./tripService";

export const tripService = new TripService(dynamoDBClient());