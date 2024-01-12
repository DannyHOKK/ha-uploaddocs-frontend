import React from "react";
import "./Introduction.css";
import ReactIcon from "../img/react_icon.png";
import SpringIcon from "../img/spring_icon.png";
import MysqlIcon from "../img/mysql_icon.png";
import GithubIcon from "../img/github_icon.png";

const Introduction = () => {
  return (
    <div className="intro-container">
      <div className="intro-context">
        <h1>
          <strong>Welcome to Danny's website</strong>
        </h1>
        <div className="intro-img-container">
          <img src={ReactIcon} />
          <img src={SpringIcon} />
          <img src={MysqlIcon} />
          <img src={GithubIcon} />
        </div>

        <div className="content-card">
          <div> Introduction</div>
          <div>
            Hi there! I'm Danny, a passionate web developer with expertise in
            building robust and scalable web applications. With several years of
            experience in the field, I specialize in utilizing modern
            technologies to create seamless user experiences.
          </div>
        </div>
        <h1>
          <strong>Website Feature 🔨</strong>
        </h1>
        <div className="feature-container">
          <div className="feature-card">
            <div className="feature-card-body">
              <div>Login System</div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-card-body">
              <div>Docs Upload System</div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-card-body">
              <div>Booking System</div>
            </div>
          </div>
        </div>
      </div>
      <h1>
        <strong>Login Account</strong>
      </h1>
      <br />
      <strong>
        <p>Account: admin</p>
        <p>Password: Aa!123123</p>
      </strong>
    </div>
  );
};

export default Introduction;
