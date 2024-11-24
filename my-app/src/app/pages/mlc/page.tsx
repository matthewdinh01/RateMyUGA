import React from 'react';
import LocationDetails from '@/app/components/LocationDetails';

const BoltonPage = () => {
  const boltonData = {
    name: 'Miller Learning Center (MLC) Study Hall',
    address: '48 Baxter St. Athens, GA',
    image: '/MLC.png',
    extraInfo: {
      Printer: true,
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
