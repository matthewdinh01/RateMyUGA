"use client";

import React, { useEffect, useState } from "react";
import LocationDetails from "@/app/components/LocationDetails";

// Define the shape of the data returned by the API
interface Ranking {
  email: string;
  foodQuality?: number;
  seatAvailability?: number;
  cheapness?: number;
  waitTime?: number;
  comments: string;
  images: string;
}

interface Location {
  name: string;
  address: string;
  image: string;
  extraInfo?: { [key: string]: boolean };
  scores: { [key: string]: number };
  comments: { user: string; text: string }[];
  images: { user: string; text: string }[];
}

async function getData(): Promise<Location> {
  try {
    const location = "The-Niche-Pizza-Co.";
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

    let qualityScore = 0;
    let availabilityScore = 0;
    let cheapnessScore = 0;
    let waitScore = 0;
    const commentsArray: { user: string; text: string }[] = [];
    const imageArray: { user: string; text: string }[] = [];

    data.forEach((ranking) => {
      qualityScore += ranking.foodQuality || 0;
      availabilityScore += ranking.seatAvailability || 0;
      cheapnessScore += ranking.cheapness || 0;
      waitScore += ranking.waitTime || 0;
      commentsArray.push({ user: ranking.email, text: ranking.comments });
      imageArray.push({ user: ranking.email, text: ranking.images });
    });

    const dataCount = data.length || 1; // Avoid division by zero
    qualityScore /= dataCount;
    availabilityScore /= dataCount;
    cheapnessScore /= dataCount;
    waitScore /= dataCount;

    return {
      name: "The Niche Pizza Co.",
      address: "45 Tate Center Dr. Athens, GA 30602",
      image: "/nichepizza.jpg",
      extraInfo: {
        Printer: false,
        "Rest Area": false,
      },
      scores: {
        "Food Quality": qualityScore,
        "Seat Availability": availabilityScore,
        Cheapness: cheapnessScore,
        "Wait Time": waitScore,
      },
      comments: commentsArray,
      images: imageArray
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error("Unable to fetch location details.");
  }
}

const NichePizzaPage = () => {
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

export default NichePizzaPage;