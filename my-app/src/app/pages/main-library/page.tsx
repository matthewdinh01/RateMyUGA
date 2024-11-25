"use client";

import React, { useEffect, useState } from "react";
import LocationDetails from "@/app/components/LocationDetails";

// Define the shape of the data returned by the API
interface Ranking {
  email: string;
  seatAvailability?: number;
  amenities?: number;
  quietness?: number;
  cleanliness?: number;
  comfort?: number;
  comments: string;
}

interface Location {
  name: string;
  address: string;
  image: string;
  extraInfo?: { [key: string]: boolean };
  scores: { [key: string]: number };
  comments: { user: string; text: string }[];
}

async function getData(): Promise<Location> {
  try {
    const location = "Main-Library";
    const res = await fetch(`http://localhost:3000/api/rankings/all/${location}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Ranking[] = await res.json();

    let availabilityScore = 0;
    let amenitiesScore = 0;
    let quietnessScore = 0;
    let cleanlinessScore = 0;
    let comfortScore = 0;
    const commentsArray: { user: string; text: string }[] = [];

    data.forEach((ranking) => {
      availabilityScore += ranking.seatAvailability || 0;
      amenitiesScore += ranking.amenities || 0;
      quietnessScore += ranking.quietness || 0;
      cleanlinessScore += ranking.cleanliness || 0;
      comfortScore += ranking.comfort || 0;
      commentsArray.push({ user: ranking.email, text: ranking.comments });
    });

    const dataCount = data.length || 1; // Avoid division by zero
    availabilityScore /= dataCount;
    amenitiesScore /= dataCount;
    quietnessScore /= dataCount;
    cleanlinessScore /= dataCount;
    comfortScore /= dataCount;

    return {
      name: "Main Library",
      address: "320 S. Jackson St. Athens, GA 30602",
      image: "/mainlibrary.jpg",
      extraInfo: {
        Printer: true,
        "Rest Area": true,
      },
      scores: {
        "Seat Availability": availabilityScore,
        Amenities: availabilityScore,
        Quietness: quietnessScore,
        Cleanliness: cleanlinessScore,
        Comfort: comfortScore
      },
      comments: commentsArray,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error("Unable to fetch location details.");
  }
}

const MainLibraryPage = () => {
  const [data, setData] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const boltonData = await getData();
        setData(boltonData);
      } catch (err: any) {
        setError(err.message || "Failed to load data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return <LocationDetails location={data} />;
};

export default MainLibraryPage;
