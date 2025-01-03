//DataStax AStra DB setup

import {Client, types} from 'cassandra-driver';
import dotenv from 'dotenv';

dotenv.config({
    path: '.env'
});

const client = new Client({
    cloud: {
        secureConnectBundle: process.env.DATASTAX_SECURE_CONNECT_BUNDLE as string
    },
    credentials: {
         username: process.env.DATASTAX_USERNAME as string,
         password: process.env.DATASTAX_PASSWORD as string
    },
    keyspace: process.env.DATASTAX_KEYSPACE as string
});

export const connectDatabase = async () => {
    try {
        const result = await client.connect();
        console.log("conect database", result);
        console.log("Connected to DataStax Astra");
    } catch (error) {
        console.error("Error connecting to DataStax Astra:", error);
        process.exit(1);
    }
}

export {client, types};