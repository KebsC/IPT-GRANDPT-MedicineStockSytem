import React from "react";
import { useState } from "react";

const Hero = ({ onSearchResults }) => {
  const [search, setSearch] = useState("");

  const handleSearch = async (value = search) => {
    if (!value.trim()) {
      onSearchResults(null);
      return;
    }

    const res = await fetch(`http://localhost:5001/medicines/${value}`);

    if (!res.ok) {
      onSearchResults([]);
      return;
    }

    const data = await res.json();
    onSearchResults(Array.isArray(data) ? data : [data]);
  };

  return (
    <section className="hero">
      <div className="absolute inset-0 flex flex-col items-start px-24 justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">Welcome to MediFind</h1>
        <p className="text-lg mb-6">
          Search for medicines across multiple pharmacies
        </p>

        <div className="w-96">
          <input
            type="text"
            placeholder="Search for medicines..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              handleSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            className="w-full px-10 py-3 rounded-lg border text-gray-900"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
