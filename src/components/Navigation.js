import React from "react"
import { Link } from "react-router-dom"

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/mobilequote">Mobile Quote</Link>
        </li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  )
}

export default Navigation
