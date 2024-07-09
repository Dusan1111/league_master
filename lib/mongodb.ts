// lib/mongodb.js
import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://league_user:ZduBE7urs3aJYqC@atlascluster.c5kehuc.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster",
);

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
