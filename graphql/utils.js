import {GraphQLClient, request} from 'graphql-request'

export const client = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT, {
    headers: {
        authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    }
})