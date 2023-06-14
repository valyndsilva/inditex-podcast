"use client";
import React, { useContext, useEffect } from "react";
import podcastContext from "@/context/podcastContext";

type Props = {
  podcastId: number;
  episodeId: number;
};

export default function EpisodeDetail({ podcastId, episodeId }: Props) {
  const {
    setIsLoading,
    setPodcastDetail,
    podcastDetail,
    setEpisodesDetail,
    episodesDetail,
  } = useContext(podcastContext);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      // Make the API call to fetch the episode detail
      setIsLoading(true);
      try {
        // Delay the fetch for 1 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(`/api/podcast/${podcastId}`, {
          next: { revalidate: 86400 },
        }); //revalidate response after 24 hrs has passed
        const podcastData = await response.json();
        // console.log(podcastData);
        // Store the fetched data in the 'podcasts' state
        setPodcastDetail(podcastData);
        const episodes = Object?.entries(podcastData).slice(1);
        // console.log(episodes);
        setEpisodesDetail(episodes);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      }
    };
    fetchPodcastDetails();
  }, [podcastId, setEpisodesDetail, setPodcastDetail, setIsLoading]);

  const filterEpisode = (
    episodesDetail: Episode[],
    podcastId: number,
    episodeId: number
  ) => {
    return episodesDetail?.filter((episode: Episode) => {
      const collectionId = episode[1].collectionId;
      const trackId = episode[1].trackId;
      return (
        collectionId === Number(podcastId) && trackId === Number(episodeId)
      );
    })[0][1];
  };

  const filteredEpisode = filterEpisode(episodesDetail, podcastId, episodeId);
  // console.log(filteredEpisode);
  const episodeTitle = filteredEpisode?.trackName;
  const episodePodcastName = filteredEpisode?.collectionName;
  const episodeDescription = filteredEpisode?.description;
  const episodeUrl = filteredEpisode?.episodeUrl;

  if (podcastDetail) {
    return (
      <main className="w-full h-full items-start justify-start p-5 space-y-5">
        <div className="flex flex-col w-full space-y-4 p-4 sm:px-6 lg:px-8  border border-gray-300 shadow-lg  rounded-md">
          <div>
            <h3 className="font-semibold">{episodeTitle}</h3>
            <span className="text-gray-500 text-sm">
              Podcast Name: {episodePodcastName}
            </span>
            <p dangerouslySetInnerHTML={{ __html: episodeDescription }}></p>
          </div>
          <div className="">
            <audio controls className="w-full">
              <source src={episodeUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </main>
    );
  }
}
