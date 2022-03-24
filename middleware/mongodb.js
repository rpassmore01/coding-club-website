import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri =
    "mongodb+srv://mongodb:mongodb@cluster0.0dpuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("Connected correctly");

    // Make the appropriate DB calls
    const db = client.db("westmount-coding-club-website");

    return db;
  } catch (e) {
    console.error(e);
  }
}
