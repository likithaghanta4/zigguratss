import React from "react";
import Wheel from "../components/Wheel";
import { projects } from "../data/projects";

const FeaturedArtist = () => {
  return (
    <div>
      <Wheel projects={projects} />
    </div>
  );
};

export default FeaturedArtist;