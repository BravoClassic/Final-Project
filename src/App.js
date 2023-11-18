/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import React, { useState } from "react";
import Modal from "./features/createAccountModal";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import { now } from "@internationalized/date";
function App() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  
  const showModal = () => {
    setShow(!show);
    if (show1) {
      setShow1(!show1);
    }
  };
  const showModal1 = () => {
    setShow1(!show1);
    if (show) {
      setShow(!show);
    }
  };
  return (
    <main className="App">
      <section className="main-container">
        <Header />
        <div className="hero">
          <div className="hero-content h-auto">
            <h1 data-testid="hero-text" className="font-extrabold text-6xl md:text-8xl p-2 text-left	text-white">What's OverYonder?</h1>
            {/* <p>Create an account/Log In to find out!</p> */}
            <div className="w-full h-fit flex flex-col md:flex-row justify-center items-center mt-12">
              <Modal
                title="Create Account"
                isCreateAccount={true}
                onClose={showModal}
                show={show}
              />
              <Modal
                title="Log In"
                onClose={showModal1}
                show={show1}
              />
              <a
              className="bg-white w-40 h-10 text-center px-1 py-2 mx-2 text-over-yonder-default rounded-md decor-none cursor-pointer"
                onClick={(e) => {
                  showModal(e);
                }}
              >
                Create Account
              </a>
              <span>or</span>
              <a className="bg-over-yonder-default w-40 mx-2 h-10 text-center px-1 py-2 text-white rounded-md decor-none cursor-pointer"
                onClick={(e) => {
                  showModal1(e);
                }}
              >
                Log In
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="container-download flex flex-wrap flex-row" id="download">
        <div className="download-header w-1/2 flex flex-wrap justify-center items-center ">
          <h5 className=" font-semibold text-4xl">Get on mobile</h5>
        </div>
        <div className="download w-1/2 h-full flex flex-col flex-wrap justify-center items-center">
          <div className="download-img flex flex-col flex-wrap justify-center items-center">
            <Link to="/">
            <img
            className="h-[55px]"
              loading="lazy"
              src="./assets/img/app-store-download.png"
              alt="OverYonder for IOS"
              title="OverYonder for IOS Download"
            />
            
            </Link>
            <Link to="/">
              <img
                loading="lazy"
                className="h-[80px]"
                src="./assets/img/google-play-badge.png"
                alt="OverYonder for Android"
                title="OverYonder for Android Download"
              />
            </Link>
          </div>
        </div>
      </section>
      <section className="w-full h-[50vh] flex flex-wrap bg-over-yonder-default justify-center content-center">
        <div>
          <h5 className="text-center text-5xl text-white font-bold">Coming Soon!</h5>
          {/* <p>Know Where Bashing?</p> */}
        </div>
      </section>
      <footer className="h-auto flex flex-wrap flex-col md:flex-row bg-white justify-around items-center p-4">
        <div className="w-[50%] h-1/2 flex flex-wrap justify-center items-center md:border-l-over-yonder-default">
          <ul className="w-3/4 h-full mb-10 md:mb-0">
            <Link to="/" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="/">
              <li>About</li>
            </Link>
            <Link to="/" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="/">
              <li>Ads</li>
            </Link>
            <Link to="/" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="/">
              <li>Support</li>
            </Link>
            <Link to="/privacy" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="/">
              <li>Privacy Policy</li>
            </Link>
            <Link to="/" className="p-3 block text-center hover:bg-over-yonder-default hover:text-white rounded-md" href="/">
              <li>Terms</li>
            </Link>
          </ul>
        </div>
        <div className=" w-1/2 h-fit">
          <h1 className="text-center">Developed By <Link to="/">Gerald</Link> and <Link to="/">Keion</Link></h1>
          <p className="text-center">&copy; OverYonder {now().year}</p>
        </div>
      </footer>
    </main>
  );
}

export default App;
