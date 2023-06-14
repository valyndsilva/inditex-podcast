import React from "react";

type Props = {
  params: {
    podcastId: number;
  };
};

export default function page({ params }: Props) {
  const { podcastId } = params;
  // console.log(podcastId );
  return <div>page</div>;
}
