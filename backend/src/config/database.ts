import dotenv from "dotenv";
import { DataAPIClient, FullCollectionInfo } from "@datastax/astra-db-ts";

dotenv.config({
  path: ".env",
});

const client = new DataAPIClient(process.env.DATASTAX_TOKEN as string);
const db = client.db(process.env.DATASTAX_KEYSPACE as string);

interface DataStaxAPIError {
  response: {
    status: number;
    data: any;
  };
}

interface DataStaxNetworkError {
  request: unknown;
  message: string;
}

function isAPIError(error: unknown): error is DataStaxAPIError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'response' in error &&
    typeof (error as any).response === 'object' &&
    'status' in (error as any).response
  );
}

function isNetworkError(error: unknown): error is DataStaxNetworkError {
  return (
    error !== null &&
    typeof error === 'object' &&
    'request' in error &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export const connectDatabase = async () => {
  try {
    const collections = await db.listCollections();
    console.log("Available Collections:", collections);

    if(collections.length === 0){
      const COLLECTION_NAME: FullCollectionInfo = {
        name: "engagement_metrics",
        options: {
          vector: {
            dimension: 1536,
            metric: "cosine"
          }
        }
      };
  
      // Check if collection exists
      if (!collections.includes(COLLECTION_NAME)) {
        console.log(`Creating Collection: ${COLLECTION_NAME.name}`);
        // Create collection using just the name
        await db.createCollection(COLLECTION_NAME.name);
      }
    }
    console.log("Connected to DataStax Astra");
    return db;
  } catch (err: unknown) {
    if (isAPIError(err)) {
      console.error("DataStax API Error:", {
        status: err.response.status,
        data: err.response.data
      });
    } else if (isNetworkError(err)) {
      console.error("Network Error connecting to DataStax:", err.message);
    } else {
      console.error("Error connecting to DataStax Astra:", err);
    }
    throw err;
  }
};

export const getCollection = (name: string) => {
  return db.collection(name);
};

export { client, db };