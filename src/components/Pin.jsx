import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { IoCloudDownload } from "react-icons/io5";
import { AiFillInstagram, AiTwotoneDelete } from "react-icons/ai";
import { client, urlFor } from "../utils/client";
import { fetchUser } from "../utils/fetchUser";



const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
    const [postHovered, setPostHovered] = useState(false);

    const navigate = useNavigate();

    const user = fetchUser();

    // prettier-ignore
    const alreadySaved = !!(save?.filter(item => item.postedBy?._id === user?.googleId))?.length; //throughs undefined add ?
    //   1 , [2,3,1] -> [1].length -> 1 -> !1 -> false -> !false -> true
    //   5 , [2,3,1] -> [].length -> 0 -> !0 -> true -> !true -> false

    const savePin = (id) => {
        if (!alreadySaved) {
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert("after", "save[-1]", [
                    {
                        _key: uuidv4(),
                        userId: user?.googleId,
                        postedBy: {
                            _type: "postedBy",
                            _ref: user?.googleId,
                        },
                    },
                ])
                .commit()
                .then(() => {
                    window.location.reload();
                });
        }
    };

    const deletePin = (id) => {
        client.delete(id).then(() => {
            window.location.reload();
        });
    };

    return (
        <div className="m-2">
            <div
                onTouchStart={() => setPostHovered(true)}
                onTouchEnd={() => setPostHovered(false)}
                onTouchMove={() => setPostHovered(true)}
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-detail/${_id}`)}
                className="relative cursor-pointer w-auto 
        hover:shadow-lg hover:shadow-pink-400 sha rounded-lg overflow-hidden transition-all duration-500 ease-in-out "
            >
                <img
                    src={urlFor(image).width(250).url()}
                    className="rounded-lg w-full"
                    alt=""
                />

                {postHovered && (
                    <div className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pt-2 pb-2 z-50 ">
                        <div className="flex justify-between items-center">
                            {/* download */}
                            <div className="flex gap-2">
                                <a
                                    href={`${image?.asset?.url}?dl`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center 
                  text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <IoCloudDownload className="text-primary" />
                                </a>
                            </div>

                            {/* savepost */}
                            {alreadySaved ? (
                                <button
                                    type="button"
                                    className="bg-mainColor opacity-70 hover:opacity-100 text-lightGray font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                                >
                                    {save?.length} Saved
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(_id);
                                    }}
                                    className="bg-mainColor opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none"
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        {/* destination */}
                        <div className="flex justify-between items-center gap-2 w-full">
                            {destination && (
                                <a
                                    href={destination}
                                    target="_blank"
                                    rel="norefferer noreferrer"

                                    onClick={(e) => e.stopPropagation()}
                                    //     className="bg-white rounded-full opacity-70 hover:opacity-100 text-lightGray font-bold px-5 py-1 shadow-md outline-none"
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center 
                                text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"

                                >
                                    <AiFillInstagram size={30} className="text-primary rounded-md p-1 items-center" />


                                </a>
                            )}
                            {postedBy?._id === user?.googleId && (
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(_id);
                                    }}
                                    className="bg-white p-2 opacity-70 hover:opacity-100 text-primary font-bold  
                  text-base rounded-full shadow-md outline-none"
                                >
                                    <AiTwotoneDelete className="text-red-600" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {/* created user profile */}
            <Link
                to={`user-profile/${postedBy?._id}`}
                className="flex gap-2 mt-2 items-center"
            >
                <img
                    src={postedBy?.image}
                    className="w-8 h-8 rounded-full object-cover"
                    alt=""
                />
                <p className="font-semibold capitalize">{postedBy?.userName}</p>
            </Link>
        </div>
    );
};

export default Pin;