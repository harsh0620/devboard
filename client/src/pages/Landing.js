import React from "react";
import { useNavigate } from "react-router-dom";
import Main from "../assets/images/main-alternative.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import Todo from "../assets/images/todo.svg";
import Log from "../assets/images/log.svg";
import Pomodoro from "../assets/images/pomodoro.svg";
import Job from "../assets/images/job.svg";
import Bookmark from "../assets/images/bookmark.svg";
import Activity from "../assets/images/workgraph.svg";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Developers's <span>Dashboard</span> App
          </h1>
          <h3>One stop destination for all developers</h3>
          <button
            className="btn btn-hero"
            onClick={() => navigate("/register")}
          >
            Login/Register
          </button>
        </div>
        <img src={Main} alt="DevBoard" className="img main-img"></img>
      </div>
      <div className="container page">
        <img src={Todo} alt="DevBoard" className="img main-img"></img>
        <div className="info">
          <h1>Todo List</h1>
          <h3>Prioritize your day with the help of Todo List</h3>
        </div>
      </div>
      <div className="container page">
        <div className="info">
          <h1>Pomodoro Clock</h1>
          <h3>
            Use Pomodoro Clock based on Pomodoro Technique by Francesco Cirillo
            to re-train your brains to focus.
          </h3>
        </div>
        <img src={Pomodoro} alt="DevBoard" className="img main-img"></img>
      </div>
      <div className="container page">
        <img src={Log} alt="DevBoard" className="img main-img"></img>
        <div className="info">
          <h1>Daily Logger</h1>
          <h3>
            Log your every day and keep the track of your present past and
            future.
          </h3>
        </div>
      </div>

      <div className="container page">
        <div className="info">
          <h1>Job Application Maintainer</h1>
          <h3>Maintain your Job Applications.</h3>
        </div>
        <img src={Job} alt="DevBoard" className="img main-img"></img>
      </div>
      <div className="container page">
        <img src={Bookmark} alt="DevBoard" className="img main-img"></img>
        <div className="info">
          <h1>BookMark</h1>
          <h3>Save your bookmark for quick access.</h3>
        </div>
      </div>
      <div className="container page">
        <div className="info">
          <h1>Activity Graph</h1>
          <h3>See your consistency with the help of activity graph</h3>
        </div>
        <img src={Activity} alt="DevBoard" className="img main-img"></img>
      </div>
      <div>
        <div>
          <footer className="footer col-lg-12">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-b-30">
                  <div className="footer-title m-t-5 m-b-20 p-b-8">
                    About DevBoard
                  </div>
                  <p className="white-text" style={{ textAlign: "left" }}>
                    DevBoard is a developer's dashboard built with the help of
                    NodeJs, ExpressJs, MongoDb, ReactJs. It provides Todolist,
                    Logger, Pomodoro clock, Job Application Maintainer, Work
                    graph and many more.Try this out.
                  </p>
                </div>

                <div className="col-md-4 m-b-30">
                  <div className="footer-title m-t-5 m-b-20 p-b-8">
                    Quick Links
                  </div>
                  <div className="footer-links">
                    <a href="/register"> Register </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              Copyright © {new Date().getFullYear()}, All Rights Reserved
              <br />
              <small>
                Developed with ♥ by &nbsp;
                <a
                  href="https://github.com/harsh0620"
                  target="_blank"
                  rel="noreferrer"
                >
                  Harsh Chandravanshi
                </a>
              </small>
            </div>
          </footer>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
