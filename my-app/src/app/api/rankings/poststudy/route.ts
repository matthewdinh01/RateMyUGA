import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, location, seatAvailability, amenities, quietness, cleanliness, comfort, comments } = await request.json();
    await connectMongoDB();
    console.log("mongo received comfort:", comfort)
    await Ranking.create({ email, location, seatAvailability, amenities, quietness, cleanliness, comfort, comments });
    return NextResponse.json({message: "Ranking succesffuly created."}, {status: 201});
}