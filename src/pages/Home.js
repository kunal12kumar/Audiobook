import React from "react";
import Header from "./Header";
import galaxy from "../videos/3129957-uhd_3840_2160_25fps.mp4"
import book from "../videos/5192068-uhd_2160_4096_25fps.mp4"


// creating the home 

export default function Home(){

    return(
        <div className="w-ful h-[400px]">
            <video src={book} autoPlay muted loop className="-z-[1] absolute object-scale-down"></video>
            <Header></Header>
        </div>
    )

}