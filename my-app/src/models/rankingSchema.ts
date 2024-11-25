import mongoose, { Schema, Document, Model } from "mongoose";

interface IRanking extends Document {
    email: string;
    location: string;

    foodQuality: number;
    foodVariety: number;
    service: number;
    cleanliness: number;

    // foodQuality: number;
    seatAvailability: number;
    cheapness: number;
    waitTime: number;

    //seatAvailability: number;
    amenities: number;
    quietness: number;
    // cleanliness: number;
    comfort: number;

    comments: string;
  }
  
  const rankingSchema = new Schema<IRanking>({
    email: { type: String, required: true },
    location: { type: String, required: true },

    foodQuality: { type: Number},
    foodVariety: { type: Number },
    service: { type: Number },
    cleanliness: { type: Number },

    // foodQuality: number;
    seatAvailability: { type: Number },
    cheapness: { type: Number },
    waitTime: { type: Number },

    //seatAvailability: number;
    amenities: { type: Number },
    quietness: { type: Number },
    // cleanliness: number;
    comfort: { type: Number },

    comments: { type: String },
  });
  
  const Ranking: Model<IRanking> = mongoose.models.Ranking || mongoose.model<IRanking>("Ranking", rankingSchema, "rankings");
  export default Ranking;
  