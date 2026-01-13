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
            displayName?: string;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: string;
        idToken?: string;
        displayName?: string;
    }
}

// --- CODE NEXTAUTH ---
import NextAuth from "next-auth";
import AzureAD from "next-auth/providers/azure-ad";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
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
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;
            }
            if (profile) {
                token.displayName =
                    (profile as { name?: string }).name || token.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.accessToken = token.accessToken;
                session.user.idToken = token.idToken;
                session.user.displayName =
                    token.displayName || token.name || undefined;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
