import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { email, location, foodQuality, seatAvailability, cheapness, waitTime, comments } = await request.json();
    await connectMongoDB();
    await Ranking.create({ email, location, foodQuality, seatAvailability, cheapness, waitTime, comments });
    return NextResponse.json({message: "Ranking succesffuly created."}, {status: 201});
}