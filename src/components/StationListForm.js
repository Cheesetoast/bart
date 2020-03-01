import React from "react"
import StationList from "./StationList"

const StationListForm = ({
  stationList,
  onSelect,
  selectedStartStation,
  selectedDestStation,
}) => {
  return (
    <form className="station-list-form">
      <StationList
        stationList={stationList}
        onSelect={onSelect}
        selected={selectedDestStation}
        isStart
      />
      <StationList
        stationList={stationList}
        onSelect={onSelect}
        selected={selectedStartStation}
      />
    </form>
  )
}

export default StationListForm
