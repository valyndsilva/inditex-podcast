import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white lg:static lg:h-auto lg:w-auto lg:bg-none">
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-blue-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
}
