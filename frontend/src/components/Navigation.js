import React from "react"
import { Link } from "react-router-dom"

function Navigation() {
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/mobilequote">Mobile Quote</Link>
        </li>
        <li>
          <Link to="/stationaryquote">Stationary Quote</Link>
        </li>
        <li>
          <Link to="/rma">RMA</Link>
        </li>
        <li>
          <Link to="/threed">Artek 3D Shipping Form</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navigation
