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
  const rankings = await Ranking.find({ location: id });

  return NextResponse.json(rankings, { status: 200 });
}

// export async function DELETE(request: NextRequest, { params }: { params: RouteParams }) {
//   const { _id, lid } = await params;

//   await connectMongoDB();
//   const res = await Ranking.deleteOne({ _id: _id, location: lid });;

//   return NextResponse.json(res, { status: 200 });
  
// }
  
  