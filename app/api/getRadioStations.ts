import { ApiResponse } from '../types/radioStation';

const API_URL =
  'https://prod.radio-api.net/stations/list-by-system-name?systemName=STATIONS_TOP&count=100';

export const getRadioStations = async (): Promise<ApiResponse> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Failed to fetch radio stations.');
  }

  const data = await response.json();

  // console.log("Fetched Radio Stations API Response:", data);

  return data;
};

export const getRadioStationDetails = async (id: string) => {
  const API_URL = `https://prod.radio-api.net/stations/details?stationIds=${id}`;

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch details for radio station with ID: ${id}`);
  }

  const data = await response.json();
  //console.log("Fetched Radio Station Details:", data); // Log the details for debugging
  return data;
};
