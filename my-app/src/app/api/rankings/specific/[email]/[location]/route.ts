import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface RouteParams {
  email: string,
  location: string
}

export async function GET(request: NextRequest, { params }: { params: RouteParams }) {
  const { email, location } = await params;
  await connectMongoDB();
  const rankings = await Ranking.find({ email: email, location: location });

  return NextResponse.json(rankings, { status: 200 });
}