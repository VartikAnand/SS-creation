// import React from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import {
//     BiSearchAlt,
//     BiPlus,
//     BiChevronRight,
//     BiChevronLeft,
// } from "react-icons/bi";

// import { RiHome7Fill } from "react-icons/ri";
// import { useState } from "react";
// import { useEffect } from "react";
// import { Logo } from "../Assets";
// import { categories } from "../utils/data";


// const isNotActiveStyle =
//     "flex items-center px-2 md:px-5 gap-2 md:gap-3 hover:text-primary text-lightGray hover:text-black transition-all duration-200 ease-in-out capitalize";

// const isActiveStyle =
//     "flex items-center px-2 md:px-5 gap-2 md:gap-3 font-extrabold text-pink-500  transition-all duration-200 ease-in-out capitalize";

// const Navbar = ({ searchTerm, setSearchTerm, user }) => {
//     const [isScroll, setScroll] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => { }, [isScroll]);

//     if (!user) return null;

//     const scrollOnClick = (side) => {
//         setScroll(true);
//         side === "right"
//             ? (document.getElementById("category").scrollLeft += 200)
//             : (document.getElementById("category").scrollLeft -= 200);
//         document.getElementById("category").scrollLeft < 199
//             ? setScroll(false)
//             : setScroll(true);
//     };

//     return (
//         <div className="flex flex-col">
//             <div className="flex items-center w-ful py-2">
//                 {/* logo */}
//                 <Link to="/">
//                     <img src={Logo} alt="" className=" w-24 flex cursor-pointer" />
//                 </Link>

//                 {/* search box */}
//                 <div className="flex justify-between items-center w-full bg-white p-2 shadow-md rounded-lg mx-4">
//                     <BiSearchAlt className="text-primary" fontSize={30} />
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         className="w-full outline-none border-none px-3 text-primary  font-semibold text-base"
//                         value={searchTerm}
//                         onFocus={() => navigate("/search")}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>

//                 <div className="flex justify-center items-center">
//                     <Link to="create-pin">
//                         <button
//                             type="button"
//                             className="bg-mainColor w-10 h-10 rounded-md  items-center justify-center md:flex hidden"
//                         >
//                             <BiPlus fontSize={24} className="text-white" />
//                         </button>

//                         <div
//                             className="bg-mainColor w-10 h-10 rounded-md md:hidden flex items-center justify-center"
//                         >
//                             <BiPlus fontSize={24} className="text-white" />
//                         </div>
//                     </Link>

//                     <Link
//                         to={`user-profile/${user._id}`}
//                         className="flex items-center justify-center w-10 min-w-10 h-10 min-h-10 shadow-lg rounded-full bg-slate-500 ml-4"
//                     >
//                         <img src={user?.image} className="rounded-full" alt="" />
//                     </Link>
//                 </div>
//             </div>

//             {/* categories */}
//             <div className="flex items-center w-ful py-2 ">
//                 <NavLink
//                     to="/"
//                     className={({ isActive }) =>
//                         isActive ? isActiveStyle : isNotActiveStyle
//                     }
//                 >
//                     <RiHome7Fill className="text-primary" fontSize={30} />
//                 </NavLink>

//                 <div className="h-6 w-[1px] bg-mainColor"></div>

//                 <div className="flex items-center w-full h-10 overflow-y-scroll hide_scrollbar relative">
//                     <div
//                         className={`${isScroll ? "flex" : "hidden"
//                             } absolute left-0 w-32 h-10  justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
//                         onClick={() => scrollOnClick("left")}
//                         id="leftSide"
//                     >
//                         <BiChevronLeft className="text-primary" fontSize={30} />
//                     </div>
//                     <div
//                         className="flex items-center w-full  overflow-y-scroll hide_scrollbar scroll-smooth duration-150 ease-in-out"
//                         id="category"
//                     >
//                         {categories.slice(0, categories.length - 1).map((category) => (
//                             <NavLink
//                                 key={category.name}
//                                 to={`/category/${category.name}`}
//                                 className={({ isActive }) =>
//                                     isActive ? isActiveStyle : isNotActiveStyle
//                                 }
//                             >
//                                 {category.name}
//                             </NavLink>
//                         ))}
//                     </div>
//                     <div
//                         className="absolute right-0 w-32 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer "
//                         onClick={() => scrollOnClick("right")}
//                     >
//                         <BiChevronRight className="text-primary" fontSize={30} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Navbar;


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({ searchTerm, setSearchTerm, user }) => {
    const navigate = useNavigate();

    if (user) {
        return (
            <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
                <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
                    <IoMdSearch fontSize={21} className="ml-1 text-primary text-2xl" />
                    <input
                        type="text"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search"
                        value={searchTerm}
                        onFocus={() => navigate('/search')}
                        className="p-2 w-full bg-white outline-none text-primary"
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