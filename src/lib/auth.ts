import { betterAuth } from "better-auth";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
  ...(googleClientId && googleClientSecret
    ? {
        socialProviders: {
          google: {
            clientId: googleClientId,
            clientSecret: googleClientSecret,
          },
        },
      }
    : {}),
  // Enable credentials (email/password) authentication
  emailAndPassword: {
    enabled: true,
    // password must have min 6 chars, at least one uppercase and one lowercase
    // We'll enforce validation in the UI; server will just store the hash
  },
});
