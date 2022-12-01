import React, { useState, useRef, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { HiMenu } from 'react-icons/hi';

import { client } from "../utils/client";
import { fetchUser } from "../utils/fetchUser";
import Pin from "./Pin";
import { userQuery } from "../utils/data";
import { Logo } from "../Assets";
import { AiFillCloseCircle } from "react-icons/ai";
import { Navbar, Search, UserProfile } from "../components";
import Sidebar from "./Sidebar";

const Home = () => {
    const [user, setUser] = useState(null);
    // categories Scroll references
    const scrollRef = useRef(null);

    // getting logged in user infor from the local browser storage

    const userInfo = fetchUser();
    // Fetch that matching user from the sanity
    useEffect(() => {
        // create the sanity query to access the sanity
        const query = userQuery(userInfo?.uid);

        client.fetch(query).then((data) => {
            console.log(data);
            setUser(data[0]);
        });
    }, []);

    useEffect(() => {
        // set scroll to the top of our page
        scrollRef.current.scrollTo(0, 0);
    }, []);
    const [searchTerm, setSearchTerm] = useState("");
    const [toggleSidebar, setToggleSidebar] = useState(false);

    return (
        <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out scrollbar-hide">
            <div className="hidden md:flex h-screen flex-initial bg-black">
                <Sidebar user={user && user} />
            </div>
            <div className="flex md:hidden flex-row scrollbar-hide">
                <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
                    <HiMenu fontSize={38} className="cursor-pointer text-primary" onClick={() => setToggleSidebar(true)} />
                    <Link to="/">
                        <img src={Logo} alt="logo" className="h-16" />
                    </Link>
                    <Link to={`user-profile/${user?._id}`}>
                        <img src={user?.image} alt="" className="w-10 h-10 rounded-full  bg-lightGray" />
                    </Link>
                </div>
                {toggleSidebar && (
                    <div className="fixed w-1/2 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
                        <div className="absolute w-full flex justify-end items-center p-2">
                            <AiFillCloseCircle fontSize={30} className="cursor-pointer text-primary" onClick={() => setToggleSidebar(false)} />
                        </div>
                        <Sidebar closeToggle={setToggleSidebar} user={user && user} />
                    </div>
                )}
            </div>
            <div className="bg-white">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user && user} />

                <div className="pb-2 flex-1 h-screen overflow-y-scroll scrollbar-hide" ref={scrollRef}>
                    <Routes>
                        <Route path="/user-profile/:userId" element={<UserProfile />} />
                        <Route path="/*" element={<Pin user={user && user} />} />
                        <Route
                            path="/search"
                            element={
                                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                            }
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Home;