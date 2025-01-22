import { ApiResponse } from '../types/radioStation';
import { getRadioStationDetails, getRadioStations } from './getRadioStations';

global.fetch = jest.fn();

describe('Radio Station API Functions', () => {
  describe('getRadioStations', () => {
    it('should fetch radio stations successfully', async () => {
      const mockResponse: ApiResponse = {
        count: 100,
        displayType: 'list',
        offset: 0,
        playables: [],
        systemName: 'STATIONS_TOP',
        title: 'Top 100 Stations',
        totalCount: 100,
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await getRadioStations();
      expect(data).toEqual(mockResponse);
    });

    it('should throw an error if the fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getRadioStations()).rejects.toThrow(
        'Failed to fetch radio stations.',
      );
    });
  });

  describe('getRadioStationDetails', () => {
    it('should fetch details for a specific radio station', async () => {
      const mockDetails = {
        id: '123',
        name: 'Station Name',
        genre: 'Pop',
      };

      const stationId = '123';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockDetails,
      });

      const data = await getRadioStationDetails(stationId);
      expect(data).toEqual(mockDetails);
    });

    it('should throw an error if the fetch fails for a specific radio station', async () => {
      const stationId = '123';
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(getRadioStationDetails(stationId)).rejects.toThrow(
        'Failed to fetch details for radio station with ID: 123',
      );
    });
  });
});
