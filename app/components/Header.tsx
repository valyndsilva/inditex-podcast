"use client";
import React, { useContext } from "react";
import Loader from "./Loader";
import podcastContext from "@/context/podcastContext";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  const { isLoading } = useContext(podcastContext);
  return (
    <header className=" z-10 w-full max-w-7xl items-center justify-between font-mono text-sm lg:flex border-b  border-gray-200">
      <p className="flex w-full justify-center pb-6 pt-8 text-blue-400 font-bold text-xl lg:static lg:w-auto   lg:p-4 ">
        <Link href="/"> Podcaster</Link>
      </p>
      {isLoading && <Loader />}
    </header>
  );
}
