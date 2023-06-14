"use client";
import React, { useEffect } from "react";
import { useContext } from "react";
import podcastContext from "@/context/podcastContext";
import Link from "next/link";

type Props = {
  podcastId: string;
};

export default function Sidebar({ podcastId }: Props) {
  const { setPodcast, podcast } = useContext(podcastContext);
  useEffect(() => {
    const fetchPodcast = async () => {
      try {
        // Make the API call to fetch the list of podcasts
        const response = await fetch("/api/podcasts", {
          next: { revalidate: 86400 },
        }); //revalidate response after 24 hrs has passed
        const podcastsData = await response.json();
        // console.log(podcastsData);
        const podcastList = podcastsData;
        // Store the fetched data in the 'podcasts' state
        // setPodcasts(podcastList);
        const filteredPodcast = podcastList.filter(
          (podcast: Podcast) => podcast.id.attributes["im:id"] === podcastId
        );
        // console.log(filteredPodcast);
        setPodcast(filteredPodcast[0]);
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      }
    };
    fetchPodcast();
  }, [podcastId, setPodcast]);
  const podcastTitle = podcast?.title.label;
  const podcastAuthor = podcast?.["im:artist"]?.label;
  const podcastDesc = podcast?.summary.label;
  const podcastImg = podcast?.["im:image"][0]?.label;
  return (
    <aside className="flex flex-col bg-white h-full w-full lg:w-[300px] items-start justify-start divide-y-2 divide-gray-300 space-y-2 py-3 px-5 border border-gray-300 rounded-md">
      <div className="flex flex-col items-center justify-center w-full">
        <Link href={`/podcast/${podcastId}`}>
          <img
            src={podcastImg}
            alt="logo"
            className=" h-40 w-40 object-contain"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col py-5">
        <Link href={`/podcast/${podcastId}`}>
          <h3 className="font-semibold">{podcastTitle}</h3>
          <h4>{podcastAuthor}</h4>
        </Link>
      </div>

      <div className="w-full flex flex-col py-5">
        <h3 className="font-semibold">Description:</h3>
        <p className="overflow-hidden">{podcastDesc}</p>
      </div>
    </aside>
  );
}
