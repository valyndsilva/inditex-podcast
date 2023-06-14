import React from "react";
import { EpisodeDetail } from "@/app/components";

type Props = {
  params: {
    podcastId: number;
    episodeId: number;
  };
};

export const dynamicParams = true; // true | false,
export default function page({ params }: Props) {
  // console.log(params);
  const { podcastId, episodeId } = params;
  //   console.log(episodeId);
  //   console.log(epodcastId);
  return <EpisodeDetail podcastId={podcastId} episodeId={episodeId} />;
}
