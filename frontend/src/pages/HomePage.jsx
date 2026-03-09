import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MainContent from "../components/MainContent";

const homepage = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState(null);

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero onSearchResults={setSearchResults} />
      <MainContent searchResults={searchResults} />
    </div>
  );
};

export default homepage;
