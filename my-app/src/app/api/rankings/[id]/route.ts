import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
  
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }
  
    await connectMongoDB();
    const rankings = await Ranking.find({ user: userId }).populate("location");
  
    return NextResponse.json(rankings, { status: 200 });
  }

  export async function DELETE(request: Request) {
    const { userId, locationId } = await request.json();
  
    await connectMongoDB();
    const result = await Ranking.deleteOne({ user: userId, location: locationId });
  
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Ranking not found" }, { status: 404 });
    }
  
    return NextResponse.json({ message: "Ranking deleted successfully" }, { status: 200 });
  }
  
  