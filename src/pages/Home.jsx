import React from "react";
import Hero from "../components/Hero";
import Grid from "../components/Grid";
// import HoverText from "../components/HoverText";
import UpdatesSection from "../components/UpdatesSection";
import ProductSlider from "../components/ProductSlider";
import FeaturedArtist from "../components/FeaturedArtist";
import Navbar from "../components/Navbar";
import TestimonialsSection from "../components/Testimonialssection";
import Wheel from "../components/Wheel";
import { projects } from "../data/projects";
import Mostviewart from "../components/Mostviewart";
import Canvas from '../components/Canvas'
import Footer from "../components/Footer"
// import ArtistArtworks from "../components/ArtistArtworks";
import BrowseByPrice from "../components/BrowseByPrice";
import GalleryApp from "../components/Galleryapp";
import GalleryLanding from "../components/GalleryLanding";
import ArtistArtworksN from "../components/ArtistArtworksN";
import Artistblogsection from "../components/Artistblogsection";





const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Grid />
      
      <div className="wheel-section">
        <Wheel projects={projects} />
      </div>
      <ProductSlider />
     
      <Mostviewart />
      <Canvas />
      
      {/* <ArtistArtworks/> */}
      <ArtistArtworksN/>
      <BrowseByPrice/>
      
      {/* <GalleryApp /> */}
      <GalleryLanding />
      
      

      {/* <HoverText /> */}
      <UpdatesSection />
      <Artistblogsection />
      <TestimonialsSection />
      <Footer />
    </>
  );
};

export default Home;
