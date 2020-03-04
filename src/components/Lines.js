import React from "react"
import Utils from "./Utils"

const findInObj = Utils.findInObj

const Lines = ({ legs, routeData }) => {
  return (
    <ul className="line-list">
      {legs.map(leg => (
        <li className="line-list__item" key={leg["@origTimeMin"]}>
          <span
            className="line-list__color"
            style={{
              background: findInObj(
                leg["@line"],
                routeData,
                "routeID",
                "hexcolor"
              ),
            }}
          ></span>{" "}
          {leg["@trainHeadStation"]}
        </li>
      ))}
    </ul>
  )
}

export default Lines
