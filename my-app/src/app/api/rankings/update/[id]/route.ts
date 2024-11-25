import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb"; // Adjust to your MongoDB connection file
import Ranking from "@/models/rankingSchema"; // Adjust to your Ranking model file

interface RouteParams {
  params: { id: string };
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;

  try {
    const updatedData = await request.json();

    // Ensure a database connection
    await connectMongoDB();

    // Find and update the ranking
    const updatedRanking = await Ranking.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate against schema rules
    });

    if (!updatedRanking) {
      return NextResponse.json(
        { message: "Ranking not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Ranking updated successfully.", ranking: updatedRanking },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating ranking:", error);
    return NextResponse.json(
      { message: "Failed to update ranking.", error: error.message },
      { status: 500 }
    );
  }
}