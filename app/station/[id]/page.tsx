"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRadioStationDetails } from "@/app/api/getRadioStations";

type StationDetails = {
  name: string;
  logo100x100: string;
  genres: string[];
  description: string;
  homepageUrl: string;
  city: string;
  country: string;
  topics: string[];
  streams: { url: string }[];
};

const StationDetailsPage = () => {
  const { id } = useParams();
  const [station, setStation] = useState<StationDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const stationId = Array.isArray(id) ? id[0] : id;

    const fetchStationDetails = async () => {
      try {
        const data = await getRadioStationDetails(stationId);
        setStation(data[0]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStationDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  if (!station) return <div>No data found for this station.</div>;

  // Fallback for undefined genres, streams, and topics
  const genres = station.genres || [];
  const streams = station.streams || [];
  const topics = station.topics || [];

  console.log("station", station);

  return (
    <main className="container mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">{station.name}</h1>
      <picture className="flex justify-center mb-6">
        <img
          src={station.logo100x100}
          alt={station.name}
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
      </picture>
  
      <p className="text-lg font-medium text-gray-200 mb-4">
        <span className="text-blue-400 font-bold">Genres:</span> {genres.join(", ")}
      </p>
  
      <p className="text-base leading-relaxed mb-6 bg-gray-800 p-4 rounded-lg shadow-inner">
        {station.description}
      </p>
  
      <div className="grid grid-cols-2 gap-4 text-sm">
        <p>
          <strong className="text-blue-400">City:</strong> {station.city}
        </p>
        <p>
          <strong className="text-blue-400">Country:</strong> {station.country}
        </p>
        <p className="col-span-2">
          <strong className="text-blue-400">Topics:</strong> {topics.join(", ")}
        </p>
      </div>
  
      <p className="mt-6">
        <strong className="text-blue-400">Listen here:</strong>{" "}
        <a
          href={station.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 hover:underline"
        >
          {station.homepageUrl}
        </a>
      </p>
  
      <h2 className="mt-10 text-2xl font-bold text-blue-400 mb-4">Streaming URL</h2>
      {streams.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {streams.map((stream, index) => (
            <li key={index}>
              <a
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:underline"
              >
                {stream.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No streaming URLs available.</p>
      )}
    </main>
  );
  
};

export default StationDetailsPage;
