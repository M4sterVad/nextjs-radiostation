"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRadioStations } from "./api/getRadioStations";
import { ApiResponse, Playable } from "./types/radioStation";

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
    <main className="container tracking-wider mx-auto p-4">
      <h1 className="text-5xl font-bold text-blue-400 my-4">{data?.title || "Radio Stations"}</h1>
      <p className="text-gray-300 mb-16">
        Displaying {data?.count || 0} of {data?.totalCount || 0} total stations.
      </p>
      <div className="grid gap-8">
        {data?.playables.map((station: Playable) => (
          <div
            key={station.id}
            className="border p-4 rounded-lg shadow-md flex items-center space-x-4 cursor-pointer 
                       transition-transform transform hover:scale-105 hover:shadow-lg hover:border-blue-500"
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
              <h2 className="text-lg font-bold">{station.name}</h2>
              <p className="text-gray-300">
                {station.city}, {station.country}
              </p>
              <p className="text-sm text-gray-400">
                Genres: {Array.isArray(station.genres) ? station.genres.join(", ") : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
  
};

export default Home;
