import { useState } from "react";
import { Search, User, LogOut, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleSearch = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    navigate(`/exams?search=${encodeURIComponent(searchText)}`);
    setShowSidebar(false);
  };

  return (
      <>
        <header className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-3xl font-bold text-blue-600">
                  TESTA
                </Link>
              </div>
              <div className="hidden md:block flex-1 max-w-lg mx-8">
                <form onSubmit={handleSearch} className="relative">
                  <input
                      type="search"
                      placeholder="Search exams, departments, courses, or units..."
                      className="w-full pl-16 pr-8 py-2 border rounded-lg text-lg focus:outline-none"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Search
                      className="absolute left-5 top-3 h-6 w-6 text-gray-400 cursor-pointer"
                      onClick={() => handleSearch()}
                  />
                </form>
              </div>
              <div className="flex items-center space-x-4">
                {user ? (
                    <>
                      <Link
                          to={`/dashboard/${user.role}`}
                          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                      >
                        <User className="h-5 w-5" />
                        <span className="hidden md:inline">{user.name}</span>
                      </Link>
                      <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="hidden md:inline">Logout</span>
                      </button>
                    </>
                ) : (
                    <>
                      <Link
                          to="/login"
                          className="hidden md:block px-4 py-2 text-m font-medium text-gray-700 hover:text-gray-900"
                      >
                        Sign In
                      </Link>
                      <Link
                          to="/signup"
                          className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                      >
                        Get Started
                      </Link>
                    </>
                )}
                <button className="md:hidden p-2" onClick={() => setShowSidebar(true)}>
                  <Search className="h-6 w-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <div
            className={`fixed top-0 right-0 h-full w-full bg-black bg-opacity-85 z-50 transform transition-transform duration-700 ease-in-out ${
                showSidebar ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="absolute top-0 right-0 h-full w-full shadow-lg flex justify-center items-center">
            <button
                onClick={() => setShowSidebar(false)}
                className="absolute top-5 right-5 bg-black text-white rounded-full p-2 flex items-center justify-center"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="w-100 h-80 relative">
              <div className="p-4 mt-12 text-center">
                <h2 className="text-4xl font-medium text-white mb-4">Search Exams</h2>
                <form onSubmit={handleSearch} className="relative">
                  <input
                      type="search"
                      placeholder="Search exams..."
                      className="w-full pl-16 pr-8 py-4 rounded-lg text-xl bg-black bg-opacity-50 text-white focus:outline-none"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                  />
                  <Search
                      className="absolute left-6 top-4 h-6 w-6 text-gray-400 cursor-pointer"
                      onClick={() => handleSearch()}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};