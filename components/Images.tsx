"use client";

import Image from "next/image";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";

type ImageType = {
  name: string;
  url: string;
};

const Images = () => {
  const {
    data: images,
    isLoading,
    mutate: refreshImages,
    isValidating,
  } = useSWR("/api/getImages", fetchImages, {
    revalidateOnFocus: false,
  });

  return (
    <div>
      <div>
        {images?.imageUrls?.map((image: ImageType) => (
          <div key={image.name}>
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
