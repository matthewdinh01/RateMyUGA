import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/userSchema";
import connectMongoDB from "./libs/mongodb";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    await connectMongoDB();

                    
                    const user = await User.findOne({ email: credentials.email }).lean();
                    console.log(user);

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password as string,
                            user.password
                        );
                        const hashedPassword = await bcrypt.hash(credentials.password as string, 10);
                        console.log("entered password: ", hashedPassword)
                        console.log("database password: ", user.password)
                        console.log(isMatch);

                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.name,
                            };
                        } else {
                            console.log("email or password is not correct");
                            return null;
                        }
                    } else {
                        console.log("user not found");
                        return null;
                    }
                } catch (error: any) {
                    console.log("an error occurred: ", error);
                    return null;
                }
            },
        }),
    ],
});


