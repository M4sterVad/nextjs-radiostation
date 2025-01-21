export interface Playable {
    id: string;
    name: string;
    city: string;
    country: string;
    genres: string[];
    lastModified: number;
    logo44x44: string;
    logo100x100: string;
    logo175x175: string;
    logo300x300: string;
    streams: string[];
    hasValidStreams: boolean;
  }
  
  export interface ApiResponse {
    count: number;
    displayType: string;
    offset: number;
    playables: Playable[];
    systemName: string;
    title: string;
    totalCount: number;
  }
  