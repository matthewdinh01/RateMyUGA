import React from 'react';
import LocationDetails from '@/app/components/LocationDetails';

const BoltonPage = () => {
  const boltonData = {
    name: 'Niche Dining Commons',
    address: 'UGA Health Sciences Campus 104 Spear Rd. Athens, GA 30602',
    image: '/niche.webp',
    extraInfo: {
      Printer: false,
      'Rest Area': true,
    },
    scores: {
      'Food Quality': 8.6,
      'Food Variety': 9.0,
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
