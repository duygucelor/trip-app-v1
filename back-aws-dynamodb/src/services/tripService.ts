import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Trip from "src/models/Trip";

export default class TripService {
  private Tablename: string = "Trips";

  constructor(private docClient: DocumentClient) {}

  async getUserTrips(username: string): Promise<Trip[]> {
    const trips = await this.docClient
      .scan({
        TableName: this.Tablename,
        FilterExpression: "username= :username",
        ExpressionAttributeValues: {
          ":username": username,
        },
      })
      .promise();
    return trips.Items as Trip[];
  }
  async createTrip(trip: Trip): Promise<Trip> {
    await this.docClient
      .put({
        TableName: this.Tablename,
        Item: trip,
      })
      .promise();
    return trip;
  }

  async updateTrip(id: string, body: Partial<Trip>): Promise<Trip> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { id },
        UpdateExpression: "set #status = :status, arrivalDate = :arrivalDate, departureDate = :departureDate",
        ExpressionAttributeNames: {
          "#status": "status",
          "#arrivalDate": "arrivalDate",
          "#departureDate": "departureDate",
        },
        ExpressionAttributeValues: {
          ":status": body.status,
          ":arrivalDate": body.arrivalDate,
          ":departureDate": body.departureDate,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated as unknown as Trip;
  }

  async deleteTrip(id: string): Promise<any> {
    return await this.docClient
      .delete({
        TableName: this.Tablename,
        Key: {
          id,
        },
      })
      .promise();
  }
}
