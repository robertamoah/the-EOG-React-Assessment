import React, { useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';

const client = createClient({
    url: 'https://react.eogresources.com/graphql',
  });
  
  const query = `
  query($latLong: WeatherQuery!) {
    getWeatherForLocation(latLong: $latLong) {
      description
      locationName
      temperatureinCelsius
    }
  }
  `;