import { NextResponse } from "next/server";

interface Props {
  params: {
    podcastId: string;
  };
}
export async function GET(request: Request, { params }: Props) {
  const podcastId = params?.podcastId;
  // console.log(podcastId);
  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${podcastId}&country=US&media=podcast&entity=podcastEpisode&limit=200`
  );

  const data = await res.json();
  const podcastData = data.results;
  // console.log(podcastData);
  return NextResponse.json(podcastData);
}
