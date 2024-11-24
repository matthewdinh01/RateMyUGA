import React from 'react';
import LocationDetails from '@/app/components/LocationDetails';

const BoltonPage = () => {
  const boltonData = {
    name: 'Tate Student Center',
    address: '45 Baxter St. Athens, GA 30602',
    image: '/tatestudent.jpg',
    extraInfo: {
      Printer: true,
      'Rest Area': true,
    },
    scores: {
      'Quietness': 8.6,
      'Seating Availability': 9.0,
      Cleanliness: 8.5,
      Lighting: 7.2,
    },
    comments: [
      { user: 'Jack', text: 'Great food!' },
      { user: 'Mary', text: 'It was ok.' },
    ],
  };

  return <LocationDetails location={boltonData} />;
};

export default BoltonPage;
