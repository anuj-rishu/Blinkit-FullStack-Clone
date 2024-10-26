import "dotenv/config";
import fastifySession from "@fastify/session";
import connectMongoDBSession from "connect-mongodb-session";
import { Admin } from "../models/index.js";

const MongodbStore = connectMongoDBSession(fastifySession);

export const sessionStore = new MongodbStore({
    uri: process.env.MONGO_URI,
    collection: "sessions"
});

sessionStore.on("error", (error) => {
    console.error("session error", error);
    process.exit(1);
});

export const authenticate = async (email, password) => {
    if(email && password){
        
    }
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return Promise.resolve({ email: email, password: password });
    } else {
        return null;
    }
};

export const PORT = process.env.PORT || 3000;
export const COOKIE_PASSWORD = process.env.COOKIE_PASSWORD;