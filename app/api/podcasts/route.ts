import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(
    "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
  );
  const data = await res.json();
  const podcastsData = data.feed.entry;
  return NextResponse.json(podcastsData);
}
