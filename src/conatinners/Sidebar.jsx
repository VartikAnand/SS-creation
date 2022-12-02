import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { Logo } from '../Assets';
import { categories } from '../utils/data';


const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-primary transition-all duration-200 ease-in-out capitalize  text-xl';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-red-600  text-primary transition-all duration-200 ease-in-out capitalize';

const Sidebar = ({ closeToggle, user }) => {
    const handleCloseSidebar = () => {
        if (closeToggle) closeToggle(false);
    };

    return (
        <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 scrollbar-hide">
            <div className="flex flex-col">
                <Link
                    to="/"
                    className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
                    onClick={handleCloseSidebar}
                >
                    <img src={Logo} alt="logo" className="h-16 border-hidden" /><span className="items-center align-middle text-5xl pt-5 text-primary border-hidden">Creation</span>
                </Link>
                <div className="flex flex-col gap-5">

                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                        onClick={handleCloseSidebar}

                    >
                        <RiHomeFill className='text-primary text-3xl' />
                        Home
                    </NavLink>
                    <h3 className="mt-2 px-5 text-base 2xl:text-3xl capitalize font-semibold">Discover cateogries</h3>
                    {categories.slice(0, categories.length - 1).map((category) => (
                        <NavLink
                            to={`/category/${category.name}`}
                            className={({ isActive }) => (isActive ? isActiveStyle : isNotActiveStyle)}
                            onClick={handleCloseSidebar}
                            key={category.name}
                        >
                            <img src={category.image} className="w-8 h-8 rounded-full shadow-sm" />
                            {category.name}
                        </NavLink>
                    ))}
                </div>
            </div>
            {user && (
                <Link
                    to={`user-profile/${user._id}`}
                    className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
                    onClick={handleCloseSidebar}
                >
                    <img src={user.image} className="w-10 h-10 rounded-full" alt="user-profile" />
                    <p className='text-xl text-lightGray '>{user.userName}</p>
                    <IoIosArrowForward className='text-2xl text-primary ' />
                </Link>
            )}
        </div>
    );
};

export default Sidebar;