import prfl from "../images/userimg.png"
import React, { useState, useEffect } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Link } from "react-router-dom"

toast.configure()

export const Navbar = () => {
  const [username, setUsername] = useState(null)
  const [loggedIn, setloggedIn] = useState(false)
  const [place, setPlace] = useState("Username")
  const [rank, setRank] = useState("Rank")
  const [name, setName] = useState("Name")
  const [contribution, setContribution] = useState(0)
  const [rating, setRating] = useState(0)
  const [maxrating, setMaxRating] = useState(0)
  function setValue(event) {
    setUsername(event.target.value)
  }
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user != null) {
      document.getElementById("rem").value = user
      setloggedIn(true)
      setUsername(user)
      fetch(`https://codeforces.com/api/user.info?handles=${user}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            setPlace(user)
            setRank(data.result[0].rank)
            setName(data.result[0].firstName + " " + data.result[0].lastName)
            setContribution(data.result[0].contribution)
            setRating(data.result[0].rating)
            setMaxRating(data.result[0].maxRating)
            document.getElementById("profileImg").src = data.result[0].titlePhoto
          } else {
            notify()
          }
        })
        .catch(() => {
          notify()
        })
    }
  }, [])

  function clicked(event) {
    event.preventDefault()
    if (username != null) {
      fetch(`https://codeforces.com/api/user.info?handles=${username}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "OK") {
            setloggedIn(true)
            setPlace(username)
            localStorage.setItem("user", username)
            setRank(data.result[0].rank)
            setName(data.result[0].firstName + " " + data.result[0].lastName)
            setContribution(data.result[0].contribution)
            setRating(data.result[0].rating)
            setMaxRating(data.result[0].maxRating)
            document.getElementById("profileImg").src = data.result[0].titlePhoto
          } else {
            notify()
          }
        })
        .catch(() => {
          notify()
        })
    }
  }
  function notify() {
    toast.error("❎ Invalid Username!", {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  function logout(event) {
    event.preventDefault()
    document.getElementById("rem").value = ""
    setloggedIn(false)
    setUsername(null)
    setPlace("Username")
    localStorage.removeItem("user")
  }
  if (loggedIn === false) {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Dynamic A2OJ
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-me">
                    About Me
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/pinakipb2/Dynamic-A2OJ-Client" target="__blank">
                    Github
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-sm-2" id="rem" type="text" placeholder={place} autoComplete="off" onChange={setValue}></input>
                <button className="btn btn-success my-2 my-sm-0" onClick={clicked}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  } else {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Dynamic A2OJ
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor02"
              aria-controls="navbarColor02"
              aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor02">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                    <span className="visually-hidden">(current)</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about-me">
                    About Me
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="https://github.com/pinakipb2/Dynamic-A2OJ-Client" target="__blank">
                    Github
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-sm-2" id="rem" type="text" placeholder={place} readOnly></input>
                <button className="btn btn-danger my-2 my-sm-0" onClick={logout}>
                  Logout
                </button>
              </form>
            </div>
          </div>
        </nav>

        <div className="container mt-5 d-flex justify-content-center">
          <div className="card p-3">
            <div className="d-flex align-items-center">
              <div className="image">
                <img src={prfl} id="profileImg" alt="Profile Pic" className="gap" width="155"></img>
              </div>
              <div className="ml-3 w-100">
                <h4 className="mb-0 mt-0">{name}</h4> <span>Rank: {rank}</span>
                <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                  <div className="d-flex flex-column">
                    <span className="articles">Max Rating</span> <span className="number1">{maxrating}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="followers">Rating</span> <span className="number2">{rating}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <span className="rating">Contribution</span> <span className="number3">{contribution}</span>
                  </div>
                </div>
                <div className="button mt-2 d-flex flex-row align-items-center">
                  <a href={`https://codeforces.com/profile/${username}`} target="__blank" className="btn btn-sm btn-primary w-100 ml-2">
                    Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
