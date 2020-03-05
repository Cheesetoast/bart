import React, { useState } from "react"
import StationList from "./StationList"
import Utils from "./Utils"

const CONSTANTS = Utils.CONSTANTS

const StationListForm = ({ stationList, selectedStations, onClick }) => {
  const [startStation, setStartStation] = useState(
    selectedStations.startStation
  )
  const [destStation, setDestStation] = useState(selectedStations.destStation)

  const saveStations = () => {
    localStorage.setItem(
      CONSTANTS.BART.LOCAL_STORAGE_ID,
      JSON.stringify({ startStation, destStation })
    )
  }

  return (
    <form className="station-list-form">
      <StationList
        stationList={stationList}
        onSelect={setStartStation}
        current={startStation}
        unavailable={destStation}
      />
      <StationList
        stationList={stationList}
        onSelect={setDestStation}
        current={destStation}
        unavailable={startStation}
      />
      <button
        onClick={e => {
          e.preventDefault()
          saveStations()
          onClick({ startStation, destStation })
        }}
      >
        Go
      </button>
    </form>
  )
}

export default StationListForm
