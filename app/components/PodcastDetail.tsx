"use client";
import React, { useContext, useEffect, useState } from "react";
import podcastContext from "@/context/podcastContext";
import { msToHoursAndSeconds } from "@/utils/msToHoursAndSeconds";
import { Pagination } from "@mui/material";
import Link from "next/link";

type Props = {
  podcastId: number;
};

export default function PodcastDetail({ podcastId }: Props) {
  const {
    setIsLoading,
    setPodcastDetail,
    podcastDetail,
    setEpisodesDetail,
    episodesDetail,
    setCurrentEpisodes,
    currentEpisodes,
  } = useContext(podcastContext);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [episodesPerPage] = useState(12);

  useEffect(() => {
    const fetchPodcastDetail = async () => {
      // Make the API call to fetch the list of podcasts
      setIsLoading(true);
      try {
        // Delay the fetch for 1 seconds
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/podcast/${podcastId}`,
          {
            next: { revalidate: 86400 },
          }
        ); //revalidate response after 24 hrs has passed
        const podcastData = await response.json();
        // console.log(podcastData);
        // Store the fetched data in the 'podcastDetail' state
        setPodcastDetail(podcastData);
        const indexOfLastEpisode = currentPage * episodesPerPage;
        const indexOfFirstEpisode = indexOfLastEpisode - episodesPerPage;
        const episodes = Object?.entries(podcastData).slice(1);
        // console.log(episodes);
        setEpisodesDetail(episodes);
        const episodesList = episodes.slice(
          indexOfFirstEpisode,
          indexOfLastEpisode
        );

        setCurrentEpisodes(episodesList);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching podcast details:", error);
      }
    };

    fetchPodcastDetail();
  }, [
    podcastId,
    currentPage,
    episodesPerPage,
    setCurrentEpisodes,
    setEpisodesDetail,
    setIsLoading,
    setPodcastDetail,
  ]);

  const paginate = (event: any, value: React.SetStateAction<number>) => {
    setCurrentPage(value);
    window.scrollTo({ top: 100, behavior: "smooth" });
  };

  if (podcastDetail) {
    return (
      <main className="w-full h-full items-start justify-start lg:p-5 space-y-4">
        <div className=" py-2 px-2 lg:px-4  border border-gray-300 shadow-lg  rounded-md">
          <h3 className="font-semibold py-4">
            {" "}
            Episodes: {podcastDetail?.length - 1}
          </h3>
        </div>
        <div className="flex flex-col  border border-gray-300 shadow-lg  rounded-md  px-2 lg:px-4 ">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full mx-auto text-left text-sm font-light">
                  <thead className="border-b font-medium">
                    <tr>
                      <th scope="col" className="px-2 py-4">
                        Title
                      </th>
                      <th scope="col" className="px-2 py-4">
                        Date
                      </th>
                      <th scope="col" className="px-2 py-4">
                        Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEpisodes?.map((episode: any) => (
                      <tr
                        key={episode[0]}
                        className="border-b bg-neutral-100 dark:border-neutral-500 dark:bg-neutral-700"
                      >
                        <td className="whitespace-nowrap px-2 py-4 text-blue-400 cursor-pointer">
                          <Link
                            href={`/podcast/${podcastId}/episode/${episode[1]?.trackId}`}
                          >
                            {episode[1]?.trackName}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-2 py-4">
                          {new Date(episode[1]?.releaseDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </td>
                        <td className="whitespace-nowrap px-2 py-4">
                          {msToHoursAndSeconds(episode[1].trackTimeMillis)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center mt-5">
                  {episodesDetail?.length > 9 && (
                    <Pagination
                      count={Math.ceil(
                        episodesDetail?.length / episodesPerPage
                      )}
                      page={currentPage}
                      onChange={paginate}
                      color="primary"
                      shape="rounded"
                      defaultPage={1}
                      size="large"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
