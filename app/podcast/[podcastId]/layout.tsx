"use client";

interface Props {
  children: React.ReactNode;
  params: any;
}
export default function RootLayout({ children, params }: Props) {
  const { podcastId } = params;
  // console.log(params);

  return (
    <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 py-10 w-full max-w-7xl mx-auto">
      {children}
    </div>
  );
}
