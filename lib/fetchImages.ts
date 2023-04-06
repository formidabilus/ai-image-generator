import exp from "constants";

const fetchImages = () =>
  fetch("/api/getImages", {
    cache: "no-store",
  }).then((res) => res.json());

export default fetchImages;
