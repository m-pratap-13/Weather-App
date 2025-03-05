import { useState } from "react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1a1d35] text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">Neuzy</a>
        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:underline">Sport</a>
          <a href="#" className="hover:underline">Health</a>
          <a href="#" className="hover:underline">Political</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">Finance</a>
          <a href="#" className="hover:underline">Life</a>
          <a href="#" className="hover:underline">Entertainment</a>
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
          <a href="#" className="hover:underline">Sport</a>
          <a href="#" className="hover:underline">Health</a>
          <a href="#" className="hover:underline">Political</a>
          <a href="#" className="hover:underline">Business</a>
          <a href="#" className="hover:underline">Finance</a>
          <a href="#" className="hover:underline">Life</a>
          <a href="#" className="hover:underline">Entertainment</a>
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
