import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();
    await connectMongoDB();
    const hashed = await bcrypt.hash(password, 5);
    const newUser = {
        name,
        email,
        password: hashed
    }
    await User.create(newUser);
    return NextResponse.json({message: "User succesffuly created."}, {status: 201});
}
