import connectMongoDB from "@/libs/mongodb";
import User from "@/models/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();
    await connectMongoDB();
    await User.create({ name, email, password });
    return NextResponse.json({message: "User succesffuly created."}, {status: 201});
}
