'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getRadioStations } from './api/getRadioStations';
import { ApiResponse, Playable } from './types/radioStation';
import SearchBar from './components/Searchbar';
import Image from 'next/image';

const Home: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [filteredStations, setFilteredStations] = useState<Playable[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(20); // 20 items per page for each segment
  const router = useRouter();

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await getRadioStations();
        setData(response);
        setFilteredStations(response.playables); // Initially display all stations
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleSearch = (query: string) => {
    if (data) {
      const filtered = data.playables.filter((station) =>
        station.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredStations(filtered);
      setCurrentPage(1); // Reset to the first page on search
    }
  };

  const handleStationClick = (id: string) => {
    router.push(`/station/${id}`);
  };

  // Calculate the indexes for the current page's data
  const indexOfLastStation = currentPage * itemsPerPage;
  const indexOfFirstStation = indexOfLastStation - itemsPerPage;
  const currentStations = filteredStations.slice(
    indexOfFirstStation,
    indexOfLastStation,
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredStations.length / itemsPerPage);

  // Determine the range of page numbers to display
  const pagesToShow = Math.min(
    totalPages,
    Math.ceil(filteredStations.length / 20),
  );

  // Pagination button handlers
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container tracking-wider mx-auto md:mt-10 p-4 md:p-8 bg-gray-900 text-gray-100 rounded-lg shadow-lg">
      <h1 className="text-5xl font-extrabold text-center text-blue-400 mb-6">
        {data?.title || 'Radio Stations'}
      </h1>
      <p className="text-lg font-medium text-gray-300 mb-6 text-center">
        Displaying {filteredStations.length} of {data?.totalCount || 0} total
        stations.
      </p>

      <SearchBar onSearch={handleSearch} />

      <div className="grid gap-4 md:gap-8 mt-6">
        {currentStations.map((station: Playable) => (
          <div
            key={station.id}
            className="bg-gray-800 p-4 md:p-8 rounded-lg shadow-md flex items-center space-x-6 cursor-pointer 
            transition-transform transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => handleStationClick(station.id)}
          >
            <Image
              src={station.logo100x100}
              alt={station.name}
              width={64}
              height={64}
              className="w-16 h-16 object-cover rounded-full"
            />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-blue-400 sm:truncate">
                {station.name.length > 20 && window.innerWidth <= 640
                  ? `${station.name.slice(0, 20)}...`
                  : station.name}
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

      {/* Pagination controls */}
      <div className="flex justify-center mt-6 space-x-4">
        {Array.from({ length: pagesToShow }, (_, index) => {
          const pageNumber = index + 1;

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              className={`px-4 py-2 text-white rounded-md ${
                currentPage === pageNumber ? 'bg-blue-500' : 'hover:bg-gray-800'
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
