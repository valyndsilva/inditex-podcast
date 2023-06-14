import { PodcastDetail } from "@/app/components";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";

type Props = {
  params: {
    podcastId: number;
  };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Inditex Music Podcast`,
    description: "Music Podcast",
  };
}

// Instead of getStaticPaths we use generateStaticParams in NextJS 13.4
export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/podcasts`,
    {
      next: { revalidate: 86400 },
    }
  ); //revalidate response after 24 hrs has passed
  const podcastsData = await response.json();
  // console.log(podcastsData);
  return podcastsData.map((podcast: any) => ({
    slug: podcast?.id.attributes["img:id"],
  }));
}
export default function page({ params }: Props) {
  const { podcastId } = params;
  // console.log(podcastId );
  return <PodcastDetail podcastId={podcastId} />;
}
