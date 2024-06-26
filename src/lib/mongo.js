// @ts-nocheck
import { MongoClient, ServerApiVersion } from 'mongodb';


export default async function getMongoDB(dbName) {
    const uri = process.env.DB_URI

    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    await client.connect();

    return client.db(dbName);
}
