import mongoose, {Mongoose } from 'mongoose'

const MONGODB_UR = process.env.MONGODB_URL

interface MongooseConnection{
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}


let cached: MongooseConnection = (global as any).mongoose

if(!cached){
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () =>{
    if(cached.conn) return cached.conn;

    if(!MONGODB_UR) throw new Error("Missing MONGDB_URL")

    cached.promise = cached.promise || mongoose.connect(
        MONGODB_UR, {
            dbName: 'brocode',
            bufferCommands: false
        }
    )

    cached.conn = await cached.promise;

    return cached.conn;
}