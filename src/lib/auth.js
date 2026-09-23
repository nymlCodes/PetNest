import dns from "node:dns";
dns.setDefaultResultOrder("ipv4first");

import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_URI);

await client.connect();

const db = client.db("pet-nest");

export const auth = betterAuth({
    database: mongodbAdapter(db),

    secret: process.env.BETTER_AUTH_SECRET,

    baseURL: [
    "http://localhost:3000",
    // "https://assignment-9-sooty.vercel.app",
    "https://neyamuls-petnest.vercel.app"
  ],

    // trustedOrigins: ["http://localhost:3000"],
    trustedOrigins: [
    "http://localhost:3000",
    // "https://assignment-9-sooty.vercel.app",
    "https://neyamuls-petnest.vercel.app"
  ],

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // prompt: "select_account",
        },
    },

    emailAndPassword: {
        enabled: true,
    },

    session: {
        strategy: "jwt",

        maxAge: 7 * 24 * 60 * 60,

        cookieCache: {
            enabled: true,
        },
    },

    plugins: [jwt()],
});