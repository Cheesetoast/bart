import React from "react"
import Utils from "./Utils"

const formatTime = Utils.formatTime

const Results = ({data, getStationName}) => {
  return data.map(station => (
    <div className="result-container" key={station["@origTimeMin"]}>
      {station["@origTimeMin"]} : {getStationName(station["@origin"])} -{" "}
      {getStationName(station["@destination"])} (
      duration {formatTime(station["@tripTime"])})
      {station.leg.length > 1 && (
        <div>
          <p>Transfers: {station.leg[station.leg.length - 2]["@order"]}</p>
          {station.leg.map(
            (leg, index) =>
              index < station.leg.length - 1 && (
                <p key={leg["@origTimeMin"]}>
                  Transfer at: {getStationName(leg["@destination"])}
                </p>
              )
          )}
        </div>
      )}
      <p>Lines:</p>
      <ul>
        {station.leg.map(leg => (
          <li key={leg["@origTimeMin"]}>{leg["@trainHeadStation"]}</li>
        ))}
      </ul>
    </div>
  ))
}

export default Results
