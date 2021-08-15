import React, { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export const SecondTable = () => {
  const [ladderTwo, setladderTwo] = useState(null)
  const [loadingTwo, setloadingTwo] = useState(true)

  useEffect(() => {
    loadLadderTwo()
  }, [])
  const API = axios.create({
    baseURL: "https://tungsten-ember-vacuum.glitch.me/",
  })
  const loadLadderTwo = async () => {
    const result = await API.get("/ladders-two")
    if (result.status === 200) {
      const data = result.data
      setladderTwo(data)
      setloadingTwo(false)
    }
  }
  function renderTableTwoRow() {
    return ladderTwo.ladders.map((ques) => {
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
  if (loadingTwo === true) {
    return (
      <div className="center">
        <div className="lds-hourglass"></div>
      </div>
    )
  } else {
    return (
      <>
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
          <tbody>{renderTableTwoRow()}</tbody>
        </table>
      </>
    )
  }
}
