import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (user) {
        return (
            <div className="flex gap-2 md:gap-5 w-full mt-2 pr-0.5 shadow-lg hover:shadow-xl hover:shadow-pink-600 rounded-2xl ">
                <div className="flex justify-start items-center w-full px-2 rounded-md bg-white text-primary border-none outline-none focus-within:shadow-sm">
                    <IoMdSearch fontSize={21} className="ml-1 text-primary text-2xl" />
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        value={searchTerm}
                        onFocus={() => navigate('/search')}
                        className="p-2 w-full bg-white outline-none"
                    />
                </div>
                <div className="flex gap-3 ">
                    <Link to={`user-profile/${user?._id}`} className="hidden md:block">
                        <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
                    </Link>
                    <Link to="/create-pin" className="bg-mainColor text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                        <IoMdAdd className='text-3xl' />
                    </Link>
                </div>
            </div>
        );
    }

    return null;
};

export default Navbar;