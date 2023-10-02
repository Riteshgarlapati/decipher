import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { fetchDocumentByField } from "@/functions";

const handler = NextAuth({
    // Configure one or more authentication providers
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {},
            async authorize(credentials) {
                return await signInWithEmailAndPassword(
                    auth,
                    credentials.email || "",
                    credentials.password || ""
                )
                    .then((userCredential) => {
                        if (userCredential.user) {
                            // console.log(userCredential.user)
                            return userCredential.user;
                        }
                        return null;
                    })
                    .catch((error) => console.log(error))
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.log(error);
                    });
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, user, token }) {
            const details = await fetchDocumentByField(session.user.email);
            session.user = {
                ...session.user,
                ...details,
            };

            return session;
        },
    },
});

export { handler as GET, handler as POST };
