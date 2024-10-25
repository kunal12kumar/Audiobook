import React from "react";
import galaxy from "../videos/8994820-hd_1080_1920_30fps.mp4"
import Header from "./Header";
import { Link } from "react-router-dom";
import SignUp from "./SignUp";

export default function Login() {

    return (

        <div className="w-full h-[600px] bg-[#F2B6D2]">
            <Header></Header>

            <div className="w-[70%] h-[90%] flex  justify-center items-center justify-self-center   ">
                <div className="w-[70%] h-[70%]  flex gap-6 pt-9 flex-col justify-center items-center bg-[#BF3F92] rounded-md shadow-[7px_5px_6px_#BC04BF] ">
                    <input className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[3px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Username"></input>
                    <input className="w-[70%] h-[40px] rounded-lg border-[1px] placeholder:text-center hover:border-[2px] hover:border-[#0F2F8C] text-center border-[#59023B] " type="text" placeholder="Password"></input>
                    <button className="w-[30%] h-[15%] rounded-lg  bg-[#C63BD9]">Login</button>
                    <div className="flex flex-row gap-4">


                        <h1 className="">Don't have Account? </h1>
                        <Link to={'/SignUp'}><button className="text-[#0F2F8C]">Sign UP</button></Link>
                    </div>
                </div>
            </div>


        </div>
    )
}