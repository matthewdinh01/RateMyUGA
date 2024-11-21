import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { user, location, foodQuality, foodVariety, service, cleanliness, comments } = await request.json();
    await connectMongoDB();
    await Ranking.create({ user, location, foodQuality, foodVariety, service, cleanliness, comments });
    return NextResponse.json({message: "Ranking succesffuly created."}, {status: 201});
}
