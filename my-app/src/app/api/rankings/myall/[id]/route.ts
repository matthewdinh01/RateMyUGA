import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

interface RouteParams {
  id: string
}

export async function GET(request: NextRequest, { params }: { params: RouteParams }) {
  const { id } = await params;
  await connectMongoDB();
  const rankings = await Ranking.find({ email: id });

  return NextResponse.json(rankings, { status: 200 });
}