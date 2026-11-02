import { betterAuth } from "better-auth";

export const auth = betterAuth({
  // Enable credentials (email/password) authentication
  emailAndPassword: {
    enabled: true,
    // password must have min 6 chars, at least one uppercase and one lowercase
    // We'll enforce validation in the UI; server will just store the hash
  },
  // Optional social login – using Google as example (you can add GitHub later)
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
});
