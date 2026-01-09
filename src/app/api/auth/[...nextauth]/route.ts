// --- EXTENSION TYPES (doit être en haut !) ---
import "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            accessToken?: string;
            idToken?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        idToken?: string;
    }
}

// --- CODE NEXTAUTH ---
import NextAuth from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const isDev = process.env.NODE_ENV === "development";

const authOptions: NextAuthOptions = {
    providers: [
        // Provider de dev simple (sans Azure AD)
        ...(isDev
            ? [
                  CredentialsProvider({
                      id: "dev-credentials",
                      name: "Dev Login (Local)",
                      credentials: {
                          email: {
                              label: "Email",
                              type: "email",
                              placeholder: "votre.nom@beneteau.com",
                          },
                          name: {
                              label: "Nom",
                              type: "text",
                              placeholder: "Votre Nom",
                          },
                      },
                      async authorize(credentials) {
                          // En dev, on accepte n'importe quel email beneteau
                          if (credentials?.email?.includes("@beneteau")) {
                              return {
                                  id: credentials.email,
                                  email: credentials.email,
                                  name:
                                      credentials.name ||
                                      credentials.email.split("@")[0],
                                  image: null,
                              };
                          }
                          return null;
                      },
                  }),
              ]
            : []),
        // Provider Azure AD (prod uniquement ou si configuré)
        AzureAD({
            clientId: process.env.AZURE_AD_CLIENT_ID ?? "",
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET ?? "",
            tenantId: process.env.AZURE_AD_TENANT_ID ?? "",
            authorization: {
                params: {
                    scope: process.env.AZURE_AD_SCOPE ?? "openid profile email",
                },
            },
        }),
    ],

    session: { strategy: "jwt" },

    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.idToken = token.idToken;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
