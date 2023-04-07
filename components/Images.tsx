"use client";

import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";
import { useState } from "react";

type ImageType = {
  name: string;
  url: string;
};

const Images = () => {
  const [refreshButtonEffect, setRefreshButtonEffect] = useState(false);

  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  const imageDescription = (image: ImageType) =>
    image.name.split("_").shift()?.toString().split(".").shift();

  return (
    <div>
      <button
        onClick={() => {
          refreshImages(images);
          //   setRefreshButtonEffect(true);
        }}
        className={`${
          refreshButtonEffect && "animate-wiggle"
        } fixed bottom-10 right-10 bg-green-600/90 text-white px-5 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-700 font-bold z-20`}
        onAnimationEnd={() => setRefreshButtonEffect(false)}
      >
        {!isLoading && isValidating ? "Refreshing..." : "Refresh Images"}
      </button>

      {isLoading && (
        <p className="animate-pulse text-center pb7 font-extralight">
          Loading <span className="text-green-700">AI</span> Generated Images...
        </p>
      )}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 px-0 md:px-10">
        {images?.imageUrls?.map((image: ImageType, i: number) => (
          <div
            key={image.name}
            className={`relative cursor-help ${
              i === 0 && "md:col-span-2 md:row-span-2"
            } hover:scale-[103%] transition-transform duration-200 ease-in-out`}
          >
            <div className="absolute flex justify-center items-center w-full h-full bg-white opacity-0 hover:opacity-80 transition-opacity duration-200 z-10">
              <p className="text-center font-light text-lg p-5">
                {imageDescription(image)}
              </p>
            </div>
            <Image
              src={image.url}
              alt={image.name}
              height={800}
              width={800}
              className="w-full rounded-sm shadow-2xl drop-shadow-lg -z-10"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Images;
