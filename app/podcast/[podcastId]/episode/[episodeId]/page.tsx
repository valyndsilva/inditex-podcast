import React from "react";

type Props = {
  params: {
    podcastId: number;
    episodeId: number;
  };
};

export default function page({ params }: Props) {
  // console.log(params);
  const { podcastId, episodeId } = params;
  //   console.log(episodeId);
  //   console.log(epodcastId);
  return <div>page</div>;
}
