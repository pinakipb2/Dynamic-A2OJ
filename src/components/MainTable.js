import React, { useState, useEffect } from "react"
import axios from "axios"
import { SecondTable } from "./SecondTable"
import { Link } from "react-router-dom"

export const MainTable = () => {
  const [ladderOne, setladderOne] = useState(null)
  const [loadingOne, setloadingOne] = useState(true)

  useEffect(() => {
    loadLadderOne()
  }, [])
  const API = axios.create({
    baseURL: "https://tungsten-ember-vacuum.glitch.me/",
  })
  const loadLadderOne = async () => {
    const result = await API.get("/ladders-one")
    if (result.status === 200) {
      const data = result.data
      setladderOne(data)
      setloadingOne(false)
    }
  }
  function renderTableOneRow() {
    return ladderOne.ladders.map((ques) => {
      return (
        <tr className="table-secondary" key={ques.id} align="center">
          <td>{ques.id}</td>
          <td>{ques.name}</td>
          <td>{ques.problems_count}</td>
          <td>
            <Link to={`/practice/${ques.id}`}>PRACTICE</Link>
          </td>
        </tr>
      )
    })
  }
  if (loadingOne === true) {
    return (
      <div className="center">
        <div className="lds-hourglass"></div>
      </div>
    )
  } else {
    return (
      <div className="spacing">
        <br></br>
        <table className="table table-hover">
          <thead>
            <tr className="table-dark" align="center">
              <th>ID</th>
              <th>NAME</th>
              <th>PROBLEMS COUNT</th>
              <th>LINK</th>
            </tr>
          </thead>
          <tbody>{renderTableOneRow()}</tbody>
        </table>
        <br></br>
        <SecondTable />
      </div>
    )
  }
}
