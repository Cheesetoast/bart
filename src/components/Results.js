import React from "react"
import Utils from "./Utils"

const formatTime = Utils.formatTime
const findInObj = Utils.findInObj

const Results = ({ data, routeData, stationList }) => {
  return data.map(station => (
    <div className="result-container" key={station["@origTimeMin"]}>
      {station["@origTimeMin"]} :{" "}
      {findInObj(station["@origin"], stationList, "abbr", "name")} -{" "}
      {findInObj(station["@destination"], stationList, "abbr", "name")} (
      duration {formatTime(station["@tripTime"])})
      {station.leg.length > 1 && (
        <div>
          <p>Transfers: {station.leg[station.leg.length - 2]["@order"]}</p>
          {station.leg.map(
            (leg, index) =>
              index < station.leg.length - 1 && (
                <p key={leg["@origTimeMin"]}>
                  Transfer at:{" "}
                  {findInObj(leg["@destination"], stationList, "abbr", "name")}
                </p>
              )
          )}
        </div>
      )}
      <ul className="line-list">
        {station.leg.map(leg => (
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
    </div>
  ))
}

export default Results
