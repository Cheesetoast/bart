import React from "react"
import Utils from "./Utils"
import Lines from "./Lines"

const formatTime = Utils.formatTime
const findInObj = Utils.findInObj

const Results = ({ bartData, routeData, stationList }) => {
  return bartData.map(station => (
    <div className="result-container" key={station["@origTimeMin"]}>
      {station["@origTimeMin"]} :{" "}
      {findInObj(station["@origin"], stationList, "abbr", "name")} >{" "}
      {findInObj(station["@destination"], stationList, "abbr", "name")} (
      duration {formatTime(station["@tripTime"])}){" "} -{" "}
      ${station["@fare"]}
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
      <Lines legs={station.leg} routeData={routeData} />
    </div>
  ))
}

export default Results
