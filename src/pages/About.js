import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <Header />
      <div className=" h-auto flex flex-wrap flex-row justify- items-center ">
        <div className="about-text h-[92vh]">
          <div
            div
            className="flex flex-col justify-center items-center w-full p-5 text-white bg-over-yonder-default"
          >
            <h1 className="text-bold text-3xl">About Us</h1>
          </div>
          <div className="backdrop-blur-3xl flex flex-col items-center justify-center	h-full saturate-200">
            <h1 className="pl-1 font-black text-5xl w-3/4 text-left">OverYonder</h1>
            <p className="p-2 w-3/4 text-justify">
              OverYonder is a social media
              platform built to help college students feel more connected to
              campus life. Students can use it to post about upcoming events,
              share information on clubs and organizations, and interact with
              other students.
            </p>
          </div>
        </div>
        <div
          className="flex flex-col justify-center items-center w-full p-5 text-white bg-over-yonder-default"
        >
          <h1 className="text-bold text-3xl">Our Mission</h1>
          <div>
          <p className="p-2 backdrop-blur-sm w-full text-justify">
            Key features include an interactive campus map showing event
            locations, comment capabilities to engage with peers, and a
            customized feed showing relevant campus happenings. OverYonder makes
            it easy for students to stay in-the-know about campus activities,
            meet new people, and find groups aligned with their interests.
            Unlike existing social platforms, OverYonder is focused entirely on
            enhancing the college experience by facilitating student involvement
            and engagement
          </p>
        </div>
        </div>

        
      </div>
      <Footer />
    </div>
  );
}

export default About;
