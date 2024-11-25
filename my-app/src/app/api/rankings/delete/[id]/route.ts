import connectMongoDB from "@/libs/mongodb";
import Ranking from "@/models/rankingSchema";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
interface RouteParams {
    params: { id: string };
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    await connectMongoDB();
    const deletedUser = await Ranking.findByIdAndDelete(id);
    if (!deletedUser) {
        return NextResponse.json({ message: "Ranking not found" }, { status: 404 });
    }
    return NextResponse.json({message: "Ranking deleted successfully."}, {status: 200});
}