import React from "react"
import { Navbar } from "./Navbar"

export const Error = () => {
  return (
    <>
      <Navbar />
      <div className="errorStyle">
        <h1>404 Page Not Found</h1>
        <p>Sorry, This Page doesn't exist</p>
      </div>
    </>
  )
}
