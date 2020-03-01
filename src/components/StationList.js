import React from "react"

const StationListForm = ({stationList, onSelect, selected, isStart}) => { 
  return (
    <select onChange={e => onSelect(e, isStart)}>
      {stationList.length > 0 &&
        stationList.map(
          (station, index) =>
            selected != index && (
              <option key={station.abbr} value={index}>
                {station.name}
              </option>
            )
        )}
    </select>
  )
}

export default StationListForm
