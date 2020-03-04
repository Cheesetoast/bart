import React from "react"

const StationListForm = ({
  stationList,
  onSelect,
  current,
  unavailable
}) => {
  return (
    <select
      className="station-list-form__list"
      onChange={e => onSelect(e.target.value)}
      value={current}
    >
      {stationList.length > 0 &&
        stationList.map(
          (station, index) =>
            unavailable != index && (
              <option
                key={station.abbr}
                value={index}
              >
                {station.name}
              </option>
            )
        )}
    </select>
  )
}

export default StationListForm
