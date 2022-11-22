import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayEvent, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateTrip, UpdateTrip } from 'src/models/Trip';
import { tripService } from 'src/services';
import { v4 } from "uuid";


export const getUserTrips = middyfy(async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const username: string = event.pathParameters.username;
    const trips = await tripService.getUserTrips(username);
    return formatJSONResponse ({
        trips
    })
})

export const createTrip = middyfy(async (event: APIGatewayEvent & CreateTrip): Promise<APIGatewayProxyResult> => {
  try {
      const id = v4();
      const trip = await tripService.createTrip(Object.assign(event.body,{id}))
      return formatJSONResponse({
        trip
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

export const updateTrip = middyfy(async (event: APIGatewayEvent & UpdateTrip): Promise<APIGatewayProxyResult> => {
    try {
        const id = event.pathParameters.id
        const trip = await tripService.updateTrip(id,event.body)
        return formatJSONResponse({
            trip
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
  })

  export const deleteTrip = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
        const trip = await tripService.deleteTrip(id)
        return formatJSONResponse({
            trip, id
        });
    } catch (e) {
        return formatJSONResponse({
            status: 500,
            message: e
        });
    }
})