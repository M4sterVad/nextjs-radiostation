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
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{station.name}</h1>
      <picture>
        <img
          src={station.logo100x100}
          alt={station.name}
          className="w-32 h-32 object-cover mb-4"
        />
      </picture>

      <p className="text-lg font-semibold mb-2">Genres: {genres.join(", ")}</p>
      <p className="text-gray-700 mb-4">{station.description}</p>
      <p>
        <strong>City:</strong> {station.city} <br />
        <strong>Country:</strong> {station.country} <br />
        <strong>Topics:</strong> {topics.join(", ")}
      </p>

      <p>
        <strong>Listen here:</strong>{" "}
        <a
          href={station.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          {station.homepageUrl}
        </a>
      </p>

      <h2 className="mt-8 text-xl font-bold mb-4">Streaming URL</h2>
      {streams.length > 0 ? (
        <ul>
          {streams.map((stream, index) => (
            <li key={index}>
              <a
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {stream.url}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No streaming URLs available.</p>
      )}
    </main>
  );
};

export default StationDetailsPage;
