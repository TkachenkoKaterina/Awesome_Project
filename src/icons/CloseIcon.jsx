import React from "react";
import Svg, { Path, } from 'react-native-svg';

const CloseIcon = () => {
    return (<Svg
        width="20" height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M18.75 5.25L5.25 18.75M18.75 18.75L5.25 5.25"
            stroke="#DBDBDB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>);
};

export default CloseIcon;