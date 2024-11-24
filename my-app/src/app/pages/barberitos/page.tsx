import React from 'react';
import LocationDetails from '@/app/components/LocationDetails';

const BoltonPage = () => {
  const boltonData = {
    name: 'Barberitos',
    address: 'Market at Tate, 45 Baxter St. Athens, GA 30602',
    image: '/barberitos.webp',
    extraInfo: {
      Printer: false,
      'Rest Area': true,
    },
    scores: {
      'Food Quality': 8.6,
      'Affordability': 9.0,
      Cleanliness: 8.5,
      Service: 7.2,
    },
    comments: [
      { user: 'Jack', text: 'Great food!' },
      { user: 'Mary', text: 'It was ok.' },
    ],
  };

  return <LocationDetails location={boltonData} />;
};

export default BoltonPage;
