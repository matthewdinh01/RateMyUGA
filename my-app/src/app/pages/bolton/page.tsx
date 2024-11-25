// "use client"
// import React from 'react';
// import LocationDetails from '@/app/components/LocationDetails';
// import { auth } from '@/auth';

// async function getData() {
//   try {
//     const session = await auth();
//     const user = session?.user;
//     const email = user?.email;
//     const location = "Bolton-Dining-Hall"
//     const res = await fetch(`http://localhost:3000/api/rankings/all/${location}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     });
//     const data = await res.json();
//     return data
//   } catch (err: any) {
//     return err
//   }
// }






//   let qualityScore = 0;
//   let varietyScore = 0;
//   let serviceScore = 0;
//   let cleanlinessScore = 0;
//   let commentsArray: {user: string, text: string}[] = []
//   let total = 0;

//   // interface comment {
//   //   user: string,
//   //   text: string
//   // } 

//   interface datas {
//     foodQuality: number,
//     foodVariety: number,
//     service: number,
//     cleanliness: number,
//     email: string,
//     comments: string;
//   }

//   data.forEach((ranking: datas) => {
//     qualityScore += ranking.foodQuality;
//     varietyScore += ranking.foodVariety;
//     serviceScore += ranking.service
//     cleanlinessScore += ranking.cleanliness;
//     commentsArray.push({user: ranking.email, text: ranking.comments})
//   });

//   qualityScore /= data.length;
//   varietyScore /= data.length;
//   serviceScore /= data.length;
//   cleanlinessScore /= data.length;
//   total = (qualityScore + varietyScore + serviceScore + cleanlinessScore) / 4

//   interface Location {
//     name: string;
//     address: string;
//     image: string;
//     extraInfo?: { [key: string]: boolean };
//     scores: { [key: string]: number };
//     comments: { user: string; text: string }[];
//   }

//   const bolton: Location = {
//     name: 'Bolton Dining Commons',
//     address: '790 S. Lumpkin St. Athens, GA 30602',
//     image: '/Bolton.png',
//     extraInfo: {
//       Printer: false,
//       'Rest Area': true,
//     },
//     scores: {
//       'Food Quality': qualityScore,
//       'Food Variety': serviceScore,
//       Cleanliness: cleanlinessScore,
//       Service: serviceScore,
//     },
//     comments: commentsArray,
//   };
//   return bolton;

//   } catch (err: any) {
//       console.log(err);
//   }

// }

// const BoltonPage = () => {
//   const boltonData = {

//     name: 'Bolton Dining Commons',
//     address: '790 S. Lumpkin St. Athens, GA 30602',
//     image: '/Bolton.png',
//     extraInfo: {
//       Printer: false,
//       'Rest Area': true,
//     },
//     scores: {
//       'Food Quality': 8.6,
//       'Food Variety': 9.0,
//       Cleanliness: 8.5,
//       Service: 7.2,
//     },
//     comments: [
//       { user: 'Jack', text: 'Great food!' },
//       { user: 'Mary', text: 'It was ok.' },
//     ],
//   };

//   const data = getData();
//   return <LocationDetails location={data} />;
// };

// export default BoltonPage;
// "use client"

// import React, { useEffect, useState } from 'react';
// import LocationDetails from '@/app/components/LocationDetails';

// async function getData() {
//   try {
//     const location = "Bolton-Dining-Hall";
//     const res = await fetch(`http://localhost:3000/api/rankings/all/${location}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch data");
//     }

//     const data = await res.json();

//     let qualityScore = 0;
//     let varietyScore = 0;
//     let serviceScore = 0;
//     let cleanlinessScore = 0;
//     const commentsArray: { user: string; text: string }[] = [];
//     let total = 0;

//     data.forEach((ranking: any) => {
//       qualityScore += ranking.foodQuality;
//       varietyScore += ranking.foodVariety;
//       serviceScore += ranking.service;
//       cleanlinessScore += ranking.cleanliness;
//       commentsArray.push({ user: ranking.email, text: ranking.comments });
//     });

//     qualityScore /= data.length;
//     varietyScore /= data.length;
//     serviceScore /= data.length;
//     cleanlinessScore /= data.length;
//     total = (qualityScore + varietyScore + serviceScore + cleanlinessScore) / 4;

//     return {
//       name: 'Bolton Dining Commons',
//       address: '790 S. Lumpkin St. Athens, GA 30602',
//       image: '/Bolton.png',
//       extraInfo: {
//         Printer: false,
//         'Rest Area': true,
//       },
//       scores: {
//         'Food Quality': qualityScore,
//         'Food Variety': varietyScore,
//         Cleanliness: cleanlinessScore,
//         Service: serviceScore,
//       },
//       comments: commentsArray,
//     };
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// const BoltonPage = () => {
//   const [data, setData] = useState<Location | null>(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const boltonData = await getData();
//         setData(boltonData);
//       } catch (err: any) {
//         setError(err.message || 'Failed to load data');
//       }
//     };

//     fetchData();
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (!data) {
//     return <div>Loading...</div>; // Show a loading state while fetching data
//   }

//   return <LocationDetails location={data} />;
// };

// export default BoltonPage;


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
    const location = "Bolton-Dining-Hall";
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
      name: "Bolton Dining Commons",
      address: "790 S. Lumpkin St. Athens, GA 30602",
      image: "/Bolton.png",
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

const BoltonPage = () => {
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

export default BoltonPage;