//DataStax AStra DB setup

import dotenv from "dotenv";
import { DataAPIClient } from "@datastax/astra-db-ts";

dotenv.config({
  path: ".env",
});

const client = new DataAPIClient(`${process.env.DATASTAX_TOKEN}`);
const db = client.db(`${process.env.DATASTAX_KEYSPACE}`);

export const connectDatabase = async () => {
  try {
    const colls = await db.listCollections();
    console.log("Connected to DataStax Astra", colls);
  } catch (error) {
    console.error("Error connecting to DataStax Astra:", error);
    process.exit(1);
  }
};

export { client, db };
