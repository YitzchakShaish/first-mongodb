import { MongoClient } from 'mongodb';
import { config } from 'dotenv';

config();
console.log(process.env.URI);

const client = new MongoClient(process.env.URI);
let db;



export async function connectToDatabase() {
    try {
        if (db) {
            console.log('Connecting to MongoDB...')
            return db
        }
        await client.connect();
        db = client.db('riddlesGame');
        console.log('Connected to MongoDB');
        return db;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

// await client.connect();

//await client.close();

// const bb = await connectToDatabase()
 //connectToDatabase()
// const usersCollection =await bb.collection('users');

// await usersCollection.insertOne({ name: "David", email: "david@example.com" });
