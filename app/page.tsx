"use client";
import React, { useContext, useEffect, useState } from "react";
import podcastContext from "@/context/podcastContext";
import { PodcastCard } from "./components";

export default function Home() {
  const { setSearchTerm, setPodcasts, podcasts, setIsLoading } =
    useContext(podcastContext);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
    const fetchPodcasts = async () => {
      setIsLoading(true);
      try {
        // Delay the fetch for 1 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Make the API call to fetch the list of podcasts
        const response = await fetch("api/podcasts", {
          next: { revalidate: 86400 },
        }); //revalidate response after 24 hrs has passed
        const podcastsData = await response.json();
        // console.log(podcastsData);
        const podcastList = podcastsData;
        setPodcasts(podcastList);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      }
    };
    fetchPodcasts();
  }, [setIsLoading, setPodcasts]);

  const handleSearch = async () => {
    if (search) {
      setIsLoading(true);
      setSearchTerm(search);
      // Delay the filter for 1 seconds
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const filteredPodcasts = podcasts.filter(
        (podcast: any) =>
          podcast?.title?.label.toLowerCase().includes(search) ||
          podcast["im:artist"]?.label.toLowerCase().includes(search)
      );
      // console.log(filteredPodcasts);
      setPodcasts(filteredPodcasts);
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full">
      <div className="w-full items-center md:space-x-4 flex flex-col md:flex-row md:justify-end">
        {/* Total Podcast Results */}
        <span className="rounded-md bg-blue-400 text-white font-bold px-4 py-2 text-xl">
          {podcasts.length}
        </span>
        {/* Search Input Form */}
        <form className="flex flex-col items-center lg:items-right lg:flex-row relative mb-10">
          <input
            type="text"
            className="border border-gray-200 mt-10 w-[350px] lg:w-[600px]  px-10 h-20 caret-blue-500 focus:caret-indigo-500 font-medium rounded-md"
            placeholder="Filter podcasts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.toLowerCase());
              handleSearch();
            }}
          />
        </form>
      </div>
      {search && (
        <h3 className="text-xl lg:text-2xl mb-10">
          Showing results for:&nbsp;
          <span className="font-medium capitalize text-blue-400">{search}</span>
        </h3>
      )}
      {/* Podcast Results */}
      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left relative gap-8">
        {podcasts &&
          podcasts?.map((podcast: any) => (
            <PodcastCard
              podcast={podcast}
              key={podcast.id.attributes["im:id"]}
            />
          ))}
      </div>
    </main>
  );
}
