import { Button, Menu, MenuItem } from "@mui/material";
import { Raleway } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaGithub } from "react-icons/fa"; // Import the LinkedIn icon
import UserMenu from "./UserMenu";
const raleway = Raleway({ subsets: ["latin"], weight: [] });
const Navbar = () => {
  return (
    <nav
      className="flex justify-between items-center p-4 bg-gray-200 dark:bg-zinc-800/30 text-white"
      style={{ backgroundColor: "#000" }}
    >
      <div className="flex items-center">
        <Link href="/" passHref>
          <span title="logo" className="cursor-pointer">
            McOrder
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <a
          href="https://github.com/Ohadefrat/restaurant"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer text-white"
        >
          <FaGithub size={20} />
        </a>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
