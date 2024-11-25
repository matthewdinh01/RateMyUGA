import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";
import Ranking from "@/models/rankingSchema";

export default async function LocationInfo() {

    try {
        const session = await auth();
        const user = session?.user;
        const email = user?.email;
        const location = "Bolton-Dining-Hall"
        const res = await fetch(`http://localhost:3000/api/rankings/all/${location}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      let qualityScore = 0;
      let varietyScore = 0;
      let serviceScore = 0;
      let cleanlinessScore = 0;
      data.forEach(ranking => {
        qualityScore += ranking.foodQuality;
        varietyScore += ranking.foodVariety;
        serviceScore += ranking.service
        cleanlinessScore += ranking.cleanliness;
        // console.log(ranking.email);
        // console.log(ranking.foodQuality);
        // console.log(ranking.foodVariety);
        // console.log(ranking.service);
        // console.log(ranking.cleanliness);
      });
      qualityScore /= data.length;
      varietyScore /= data.length;
      serviceScore /= data.length;
      cleanlinessScore /= data.length;
      let total = (qualityScore + varietyScore + serviceScore + cleanlinessScore) / 4
      console.log(qualityScore, varietyScore, serviceScore, cleanlinessScore, total)

    } catch (err: any) {
        console.log(err);
    }

    return (
        <div/>
    );
} 