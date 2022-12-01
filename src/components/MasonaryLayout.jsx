import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";


const breakPontsObj = {
    default: 4,
    1800: 5,
    1400: 4,
    1000: 3,
    800: 2,
    100: 1,
};

const MasonryLayout = ({ pins }) => {
    return (
        <Masonry className="flex animate-slide-fwd" breakpointCols={breakPontsObj}>
            {pins?.map((pin) => (
                <Pin key={pin._id} pin={pin} className="w-max" />
            ))}
        </Masonry>
    );
};

export default MasonryLayout;