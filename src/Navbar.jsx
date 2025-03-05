import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-[100%] z-1 bg-[#1a1d35] text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">
          Weather Web App
        </a>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>

        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:underline flex items-center">
            <FaSignInAlt className="mr-1" /> Login
          </a>
          <a href="#" className="hover:underline flex items-center">
            <FaUserPlus className="mr-1" /> Register
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4 text-center">
          <a href="#" className="hover:underline">
            Home
          </a>
          <a href="#" className="hover:underline">
            About Us
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
          <a href="#" className="hover:underline flex items-center">
            <FaSignInAlt className="mr-1" /> Login
          </a>
          <a href="#" className="hover:underline flex items-center">
            <FaUserPlus className="mr-1" /> Register
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
