
import React, { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white min-h-[88px] w-full flex items-center justify-between flex-wrap px-2.5 border-b border-[rgba(247,248,250,1)] fixed top-0 left-0 z-50">
      <div className="flex min-h-[88px] flex-col items-stretch justify-center w-[194px] py-8">
        <Link to="/">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/d6eb265de0f74f23ac89a5fae3b90a0d/ee47f81d3df30406eedeb997df60ffc12cce0b3965827fc005f4c7a2da4ca470"
            alt="Company Logo"
            className="aspect-[8.06] object-contain w-[194px] md:w-[194px] w-[120px]"
          />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMenu}>
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links - Desktop */}
      <nav className="hidden md:flex items-center gap-6 mx-8">
        <Link to="/explore" className="text-gray-700 hover:text-[#ea2be2] font-medium">
          Explorar
        </Link>
        <Link to="/my-courses" className="text-gray-700 hover:text-[#ea2be2] font-medium">
          Meus Cursos
        </Link>
        <Link to="/questions" className="text-gray-700 hover:text-[#ea2be2] font-medium">
          Questões
        </Link>
        <Link to="/course" className="text-gray-700 hover:text-[#ea2be2] font-medium">
          Curso
        </Link>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden w-full py-4 bg-white border-t border-gray-100">
          <nav className="flex flex-col space-y-4 px-4">
            <Link
              to="/explore"
              className="text-gray-700 hover:text-[#ea2be2] font-medium py-2"
              onClick={toggleMenu}
            >
              Explorar
            </Link>
            <Link
              to="/my-courses"
              className="text-gray-700 hover:text-[#ea2be2] font-medium py-2"
              onClick={toggleMenu}
            >
              Meus Cursos
            </Link>
            <Link
              to="/questions"
              className="text-gray-700 hover:text-[#ea2be2] font-medium py-2"
              onClick={toggleMenu}
            >
              Questões
            </Link>
            <Link
              to="/course"
              className="text-gray-700 hover:text-[#ea2be2] font-medium py-2"
              onClick={toggleMenu}
            >
              Curso
            </Link>
          </nav>
        </div>
      )}

      <div className="hidden md:flex min-w-60 min-h-[88px] items-center gap-2.5 py-[19px]">
        <div className="flex min-w-60 min-h-[50px] items-center gap-[26px] flex-wrap">
          <div className="bg-slate-50 border flex min-w-60 min-h-[50px] max-w-[400px] items-center w-[350px] px-5 py-[11px] rounded-[5px] border-[rgba(237,240,245,1)]">
            <input
              type="text"
              placeholder="Pesquisar"
              className="flex-1 bg-transparent text-[15px] text-[#262f3c] outline-none"
            />
            <button className="bg-white border flex items-center justify-center w-7 h-7 rounded-[3px] border-[rgba(238,241,246,1)]">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="w-[50px] h-[50px] border-2 border-white cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-0 border border-gray-100">
              <nav className="flex flex-col">
                <Link
                  to="/explore"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-[#ea2be2]"
                >
                  Explorar
                </Link>
                <Link
                  to="/my-courses"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-[#ea2be2]"
                >
                  Meus Cursos
                </Link>
                <Link
                  to="/questions"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-[#ea2be2]"
                >
                  Questões
                </Link>
                <Link
                  to="/course"
                  className="px-4 py-3 text-sm font-medium text-gray-700 hover:bg-slate-50 hover:text-[#ea2be2]"
                >
                  Curso
                </Link>
                <div className="border-t border-gray-100">
                  <Link
                    to="/"
                    className="px-4 py-3 text-sm font-medium text-red-600 hover:bg-slate-50 block"
                  >
                    Sair
                  </Link>
                </div>
              </nav>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
