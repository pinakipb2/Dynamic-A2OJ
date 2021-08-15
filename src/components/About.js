import styles from "../styles/About.module.css"
import React from "react"
import { Link } from "react-router-dom"

export const About = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Dynamic A2OJ
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/about-me">
                  About Me
                  <span className="visually-hidden">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="https://github.com/pinakipb2/Dynamic-A2OJ-Client" target="__blank">
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className={styles.container}>
        <div className={styles["cover-photo"]}>
          <img src="https://avatars.githubusercontent.com/u/48859773?s=400&u=342e37c14abf647e5b4b9641f61008272c25d4c6&v=4" className={styles.profile}></img>
        </div>
        <div className={styles["profile-name"]}>Pinaki Bhattacharjee</div>
        <p className={styles.about}>Web Developer</p>
        <a href="https://github.com/pinakipb2/Dynamic-A2OJ-Client/issues">
          <button className={styles["msg-btn"]}>Report Issues</button>
        </a>
        <a href="https://github.com/pinakipb2/Dynamic-A2OJ-Client/issues">
          <button className={styles["follow-btn"]}>Suggest Ideas</button>
        </a>
        <div>
          <a href="https://github.com/pinakipb2" style={{ color: "#ffffff" }} target="__blank">
            <i className="fab fa-github"></i>
          </a>
          <a href="mailto:pinakipb2@gmail.com" style={{ color: "#ffffff" }} target="__blank">
            <i className="far fa-envelope"></i>
          </a>
          <a href="https://www.linkedin.com/in/pinakipb2" style={{ color: "#ffffff" }} target="__blank">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </>
  )
}
