/* eslint-disable max-len */
import { AxiosInstance } from "axios";
import Trip, { CreateTrip } from "../core/trip/domain/trip";
import { AxiosClientError } from "./axiosClient";

export default class TripBackend implements TripBackend {
  constructor(private readonly axiosClient: AxiosInstance) {
    this.axiosClient = axiosClient;
  }

  async getUserTrips(username: string): Promise<Trip[]> {
    try {
      const response = await this.axiosClient.get(`/trips/${username}`);
      return response.data.trips;
    } catch (error) {
      throw new AxiosClientError(error);
    }
  }

  async createTrip(data: CreateTrip): Promise<Trip> {
    try {
      const response = await this.axiosClient.post(
        `/trips/${data.username}`,
        data
      );
      return response.data.trip;
    } catch (error) {
      throw new AxiosClientError(error);
    }
  }
}
