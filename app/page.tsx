'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRadioStations } from './api/getRadioStations';
import { ApiResponse, Playable } from './types/radioStation';

const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await getRadioStations();
        setData(response);

        // console.log("Fetched Radio Stations:", response);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleStationClick = (id: string) => {
    router.push(`/station/${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container tracking-wider mx-auto md:mt-10 p-4 md:p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-6">
        {data?.title || 'Radio Stations'}
      </h1>
      <p className="text-lg font-medium text-gray-300 mb-16 text-center">
        Displaying {data?.count || 0} of {data?.totalCount || 0} total stations.
      </p>
      <div className="grid gap-8">
        {data?.playables.map((station: Playable) => (
          <div
            key={station.id}
            className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-md flex items-center space-x-6 cursor-pointer 
   transition-transform transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => handleStationClick(station.id)}
          >
            <picture>
              <img
                src={station.logo100x100}
                alt={station.name}
                className="w-16 h-16 object-cover rounded-full"
              />
            </picture>
            <div>
              <h2 className="text-lg font-bold text-blue-400">
                {station.name}
              </h2>
              <p className="text-gray-300">
                {station.city}, {station.country}
              </p>
              <p className="text-sm text-gray-400">
                Genres:{' '}
                {Array.isArray(station.genres)
                  ? station.genres.join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
