import { handlerPath } from '@libs/handler-resolver';

export const getUserTrips = {
    handler: `${handlerPath(__dirname)}/handler.getUserTrips`,
    events: [
        {
            http: {
                method: 'get',
                path: 'trips/{username}',
            },
        },
    ],
};

export const createTrip = {
    handler: `${handlerPath(__dirname)}/handler.createTrip`,
    events: [
        {
            http: {
                method: 'post',
                path: 'trips/{username}',
            },
        },
    ],
};

export const updateTrip = {
    handler: `${handlerPath(__dirname)}/handler.updateTrip`,
    events: [
        {
            http: {
                method: 'put',
                path: 'trips/{username}/{id}',
            },
        },
    ],
};

export const deleteTrip = {
    handler: `${handlerPath(__dirname)}/handler.deleteTrip`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'trips/{username}/{id}',
            },
        },
    ],
};