import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Error } from "./Error"
import { Navbar } from "./Navbar"
import axios from "axios"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

export const Practice = () => {
  const { id } = useParams()
  const ans = isNaN(id)
  const [problems, setProblems] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [doneQues, setDoneQues] = useState(null)
  const [user, setUser] = useState(null)

  setInterval(() => {
    setUser(localStorage.getItem("user"))
  }, 100)

  useEffect(() => {
    loadQues()
  }, [user])

  const API = axios.create({
    baseURL: "https://tungsten-ember-vacuum.glitch.me/",
  })

  const loadQues = async () => {
    const url1 = `/ladder-one/${id}`
    const url2 = `/ladder-two/${id}`
    try {
      const result = await API.get(url1)
      if (result.status === 200) {
        const data = result.data
        setProblems(data)

        if (user != null) {
          const url = `https://codeforces.com/api/user.status?handle=${user}&from=1&count=10000`
          const res = await API.get(url)
          if (res.status === 200) {
            const val = res.data.result
            let done = []
            val.forEach((v) => {
              if (v.verdict === "OK") {
                done.push(v.problem.name)
              }
            })
            const unique = done.filter((v, i, a) => a.indexOf(v) === i)
            const probNames = data.ladders.map((a) => a.name)
            const refinedData = unique.filter((item) => {
              return probNames.includes(item)
            })
            setDoneQues(refinedData)
            setLoading(false)
          }
        } else {
          setLoading(false)
        }
      }
    } catch (err) {
      try {
        const result = await API.get(url2)
        if (result.status === 200) {
          const data = result.data
          setProblems(data)
          if (user != null) {
            const url = `https://codeforces.com/api/user.status?handle=${user}&from=1&count=10000`
            const res = await API.get(url)
            if (res.status === 200) {
              const val = res.data.result
              let done = []
              val.forEach((v) => {
                if (v.verdict === "OK") {
                  done.push(v.problem.name)
                }
              })
              const unique = done.filter((v, i, a) => a.indexOf(v) === i)
              const probNames = data.ladders.map((a) => a.name)
              const refinedData = unique.filter((item) => {
                return probNames.includes(item)
              })
              setDoneQues(refinedData)
              setLoading(false)
            }
          } else {
            setLoading(false)
          }
        }
      } catch (err) {
        if (err.response.status === 404) {
          setLoading(false)
          setError(true)
        }
      }
    }
  }
  function renderTableRow() {
    return problems.ladders.map((ques) => {
      return user != null && doneQues != null && doneQues.includes(ques.name) ? (
        <tr className="table-success" key={ques.id} align="center">
          <td>{ques.id}</td>
          <td>{ques.name}</td>
          <td>{ques.difficulty_level}</td>
          <td>
            <a href={ques.link} target="__blank">
              PRACTICE
            </a>
          </td>
        </tr>
      ) : (
        <tr className="table-secondary" key={ques.id} align="center">
          <td>{ques.id}</td>
          <td>{ques.name}</td>
          <td>{ques.difficulty_level}</td>
          <td>
            <a href={ques.link} target="__blank">
              PRACTICE
            </a>
          </td>
        </tr>
      )
    })
  }
  if (loading === true) {
    return (
      <>
        <Navbar />
        <div className="center">
          <div className="lds-hourglass"></div>
        </div>
      </>
    )
  }
  if (error === true) {
    return <Error />
  }
  if (ans === false && problems !== null) {
    return (
      <>
        <Navbar />
        <div className="spacing">
          <br></br>
          <table className="table table-hover">
            <thead>
              <tr className="table-dark" align="center">
                <th>ID</th>
                <th>NAME</th>
                <th>DIFFICULTY LEVEL</th>
                <th>LINK</th>
              </tr>
            </thead>
            <tbody>{renderTableRow()}</tbody>
          </table>
          <br></br>
        </div>
      </>
    )
  } else {
    return <Error />
  }
}
