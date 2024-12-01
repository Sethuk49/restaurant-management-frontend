import { Link, useNavigate } from 'react-router-dom';
import { useState, useTransition } from 'react';

const HomeLayout = ({ children, noSearch, handleSearch, search, handleAdditionalFilter, handleIsSearch }) => {
    // const [search, setSearch] = useState("");

    const navigate = useNavigate();
    const [isPending, startTransition] = useTransition();
    const role = localStorage.getItem("role");
    const token = localStorage.getItem('token');

    const handleLinkClick = (path) => {
        startTransition(() => {
            navigate(path);
        });
    };

    const handleSearchHere = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleIsSearch();
        }

        handleSearch(e.target.value)
      };

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gray-200">
            {/* Header */}
            <header className="h-[7%] bg-purple-400 text-white p-4 shadow-lg">
                <nav className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">
                        <Link to="/" onClick={() => handleLinkClick('/')}>Restaurant Management</Link>
                    </div>

                    {/* Rest of your header code... */}

                    {!noSearch &&
                        <div class="relative">
                            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                className="w-96 p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search by Menu Items, Location, Restaurant Name..."
                                onChange={(e) => handleSearch(e.target.value)} // Update search value on input change
                                onKeyDown={handleSearchHere} // Listen for keydown events (Enter or Space)
                                value={search}
                                required
                            />

                            {/* <button type="submit" class="m-1 text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}


                        </div>
                    }




                    <ul className="hidden md:flex space-x-6">

                        <Link to="/home" onClick={() => handleLinkClick('/home')} className="hover:text-gray-300">Home</Link>

                        {token && role === "user" && (
                            <li>
                                <Link to="/my-orders" onClick={() => handleLinkClick('/my-orders')} className="hover:text-gray-300">Orders</Link>
                            </li>
                        )}
                        {token && (
                            <li>
                                <Link to="/logout" onClick={() => handleLinkClick('/logout')} className="hover:text-gray-300">Logout</Link>
                            </li>
                        )}
                        {!token && (
                            <li>
                                <Link to="/login" onClick={() => handleLinkClick('/login')} className="hover:text-gray-300">Login</Link>
                            </li>
                        )}
                    </ul>


                </nav>
            </header>

            <main className="h-[88%] p-4 overflow-auto">
                {children}
            </main>

            <footer className="h-[7%] bg-purple-400 text-white text-center p-4">
                <p>&copy; 2024 My Website. All rights reserved.</p>
                <b><a href="/resaturant-registration"> Register a Restaurant</a></b>
            </footer>
        </div>
    );
};

export default HomeLayout;
