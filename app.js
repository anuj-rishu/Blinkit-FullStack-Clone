import "dotenv/config";
import { connectDB } from "./src/config/connect.js";
import fastify from "fastify";

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
    } catch (error) {
        console.error("Failed to connect to the database ❌:", error);
        process.exit(1); 
    }

    const app = fastify();
    const PORT = process.env.PORT || 3000; 
    app.listen({ port: PORT, host: "0.0.0.0" }, () => {
        console.log(`Blinkit started, server is running on port ${PORT}`);
    });
};

start();