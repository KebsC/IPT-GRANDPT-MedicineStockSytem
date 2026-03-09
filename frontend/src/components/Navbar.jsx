import React from "react";
import {
  Sidebar,
  TextAlignJustify,
  ShoppingCart,
  UserRound,
  Search,
} from "lucide-react";

const Navbar = () => {
  return (
    <header>
      <div className="bg-base-300 border-b border-base-content/10">
        <div className="mx-auto m-w-6xl p-4">
          <div className="flex items-center justify-between">
            {/* Header Part*/}
            <h1 className="text-4xl font-bold text-primary font-mono tracking-tight ml-12">
              Bangag Botika
            </h1>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search for medicines..."
                size="46"
                className="px-3 py-1 border rounded-md mr-80 text-black-100"
              ></input>

              {/* Nav Part*/}
              <nav>
                <ul className="flex gap-10 font-bold">
                  <li>
                    <a href="#home">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#contatc">Contact</a>
                  </li>
                  <li>
                    <ShoppingCart className="cursor-pointer" />
                  </li>
                  <li className="mr-8">
                    <UserRound className="cursor-pointer" />
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
