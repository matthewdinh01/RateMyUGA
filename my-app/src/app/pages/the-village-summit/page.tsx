"use client";

import React, { useEffect, useState } from "react";
import LocationDetails from "@/app/components/LocationDetails";

// Define the shape of the data returned by the API
interface Ranking {
  email: string;
  foodQuality?: number;
  foodVariety?: number;
  service?: number;
  cleanliness?: number;
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
    const location = "Village-Summit";
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
    let varietyScore = 0;
    let serviceScore = 0;
    let cleanlinessScore = 0;
    const commentsArray: { user: string; text: string }[] = [];

    data.forEach((ranking) => {
      qualityScore += ranking.foodQuality || 0;
      varietyScore += ranking.foodVariety || 0;
      serviceScore += ranking.service || 0;
      cleanlinessScore += ranking.cleanliness || 0;
      commentsArray.push({ user: ranking.email, text: ranking.comments });
    });

    const dataCount = data.length || 1; // Avoid division by zero
    qualityScore /= dataCount;
    varietyScore /= dataCount;
    serviceScore /= dataCount;
    cleanlinessScore /= dataCount;

    return {
      name: "Village Summit Dining Commons",
      address: "80 Carlton St. Athens, GA 30602",
      image: "/joefrank.webp",
      extraInfo: {
        Printer: true,
        "Rest Area": true,
      },
      scores: {
        "Food Quality": qualityScore,
        "Food Variety": varietyScore,
        Cleanliness: cleanlinessScore,
        Service: serviceScore,
      },
      comments: commentsArray,
    };
  } catch (err) {
    console.error("Error fetching data:", err);
    throw new Error("Unable to fetch location details.");
  }
}

const VillageSummitPage = () => {
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

export default VillageSummitPage;