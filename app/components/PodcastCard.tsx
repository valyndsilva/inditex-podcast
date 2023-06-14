"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";

type Props = {
  podcast: Podcast;
};

export default function PodcastCard({ podcast }: Props) {
  // console.log(podcast);
  const podcastId = podcast.id.attributes["im:id"];
  const podcastTitle = podcast["im:name"]?.label;
  const podcastImg = podcast["im:image"][0]?.label;
  const podcastAuthor = podcast["im:artist"]?.label;

  return (
    <Link href={`/podcast/${podcastId}`}>
      <div className="cursor-pointer flex flex-col mt-20 bg-white items-center justify-center relative border border-gray-300 rounded-md">
        <div className="absolute bottom-32 w-24 h-24">
          <Image
            src={podcastImg}
            alt="logo"
            fill
            className="rounded-full object-contain"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-col items-center justify-center h-40 pt-10 pb-5 px-10 ">
          <h2 className="uppercase font-semibold text-sm text-center">
            {podcastTitle}
          </h2>
          <p className="text-sm text-center">Author: {podcastAuthor}</p>
        </div>
      </div>
    </Link>
  );
}
