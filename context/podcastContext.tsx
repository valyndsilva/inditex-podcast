"use client";
import React, { ReactNode, createContext, useState } from "react";

interface PodcastProviderProps {
  children: ReactNode;
}

interface Podcast {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  searchTerm: any;
  setSearchTerm: any;
  podcasts: any;
  setPodcasts: any;
  podcast: any;
  setPodcast: any;
  podcastDetail: any;
  setPodcastDetail: any;
  episodesDetail: any;
  setEpisodesDetail: any;
  currentEpisodes: any;
  setCurrentEpisodes: any;
}
export const podcastContext = createContext<Podcast>({} as Podcast);

export function PodcastProvider({ children }: PodcastProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [podcasts, setPodcasts] = useState<any>([]);
  const [podcast, setPodcast] = useState<Podcast>();
  const [podcastDetail, setPodcastDetail] = useState<any>();
  const [episodesDetail, setEpisodesDetail] = useState<Episode[]>();
  const [currentEpisodes, setCurrentEpisodes] = useState<any>();

  return (
    <podcastContext.Provider
      value={{
        isLoading,
        setIsLoading,
        searchTerm,
        setSearchTerm,
        podcasts,
        setPodcasts,
        podcast,
        setPodcast,
        podcastDetail,
        setPodcastDetail,
        episodesDetail,
        setEpisodesDetail,
        currentEpisodes,
        setCurrentEpisodes,
      }}
    >
      {children}
    </podcastContext.Provider>
  );
}

export default podcastContext;
