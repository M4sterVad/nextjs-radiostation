'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getRadioStationDetails } from '@/app/api/getRadioStations';
import Link from 'next/link';

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

  console.log('station', station);

  return (
    <main className="container tracking-wider mx-auto md:mt-10 p-6 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <Link href="/" className="text-blue-400 font-bold pb-10">
        &#8592; Back
      </Link>

      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-400">
        {station.name}
      </h1>
      <picture className="flex justify-center mb-6">
        <img
          src={station.logo100x100}
          alt={station.name}
          className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
        />
      </picture>

      <p className="text-lg font-medium text-gray-200 mb-4">
        <span className="text-blue-400 font-bold">Genres:</span>{' '}
        {genres.join(', ')}
      </p>

      <p className="text-base leading-relaxed tracking-widest mb-6 bg-gray-800 p-4 md:p-8 rounded-lg shadow-inner">
        {station.description}
      </p>

      <div className="flex items-center justify-between bg-gray-800 p-4 md:p-8 rounded-lg shadow-inner mb-6">
        <p className="text-sm">
          <strong className="text-blue-400">Location:</strong> {station.city},{' '}
          {station.country}
        </p>
        <p className="text-sm">
          <strong className="text-blue-400">Topics:</strong> {topics.join(', ')}
        </p>
      </div>

      <p className="relative group inline-block">
        <Link
          href={station.homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="0.8"
            stroke="currentColor"
            className="size-24 md:size-32"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
            />
          </svg>
        </Link>

        {/* Tooltip */}
        <span className="absolute left-1/2 transform -translate-x-1/2 mb-2 text-xs text-gray-100 bg-gray-700 p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {station.homepageUrl}
        </span>
      </p>

      <h2 className="mt-10 text-2xl font-bold text-blue-400 mb-4">
        Streaming URLs
      </h2>
      {streams.length > 0 ? (
        <ul className="list-disc list-inside space-y-2">
          {streams.map((stream, index) => (
            <li key={index}>
              <Link
                href={stream.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:underline"
              >
                {stream.url}
              </Link>
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
