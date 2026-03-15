import React, { useState } from "react";
import { ShoppingCart, UserRound } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header>
      <div className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto m-w-6xl p-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <h1 className="text-4xl font-bold text-primary font-mono tracking-tight ml-12">
                MediFind
              </h1>
            </Link>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search for medicines..."
                size="46"
                className="px-3 py-1 border rounded-md mr-80 text-black-100"
              />
              <nav>
                <ul className="flex gap-10 font-bold items-center">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>About</li>
                  <li>Contact</li>
                  <li>
                    <Link to="/orders">
                      <ShoppingCart className="cursor-pointer" />
                    </Link>
                  </li>
                  <li className="mr-8 relative">
                    <UserRound
                      className="cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                        <Link
                          to="/add-medicine"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                        >
                          Add Medicine
                        </Link>
                        <Link
                          to="/cart"
                          onClick={() => setDropdownOpen(false)}
                          className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                        >
                          Edit Medicines
                        </Link>
                      </div>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
