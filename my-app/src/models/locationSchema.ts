import mongoose, { Schema, Document, Model } from "mongoose";
  
  interface ILocation extends Document {
    name: string;
  }
  
  const locationSchema = new Schema<ILocation>({
    name: { type: String, required: true },
  });
  
  const Location: Model<ILocation> = mongoose.models.Location || mongoose.model<ILocation>("Location", locationSchema);
  export default Location;
  