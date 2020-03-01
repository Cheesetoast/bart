import React, { useState, useEffect } from "react"
import StationListForm from "./StationListForm"

import './bart.scss'

const CONSTANTS = {
  BART: {
    APIKEY: "MW9S-E7SL-26DU-VV8V",
    BASEURL: "https://api.bart.gov/api/etd.aspx?cmd=etd&",
  },
}

const Bart = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [bartData, setBartData] = useState([])
  const [stationList, setStationList] = useState([])
  const [selectedStartStation, setSelectedStartStation] = useState(0)
  const [selectedDestStation, setSelectedDestStation] = useState(1)
  const [urlQuery, setUrlQuery] = useState(
    "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=12th&key=MW9S-E7SL-26DU-VV8V&json=y"
  )

  const updateUrlQuery = () => {
    stationList.length > 0 &&
      setUrlQuery(
        `${CONSTANTS.BART.BASEURL}orig=${stationList[selectedStartStation].abbr}&key=${CONSTANTS.BART.APIKEY}&json=y`
      )
  }

  useEffect(() => {
    updateUrlQuery()
  }, [selectedStartStation])

  useEffect(() => {
    fetchData(urlQuery)
  }, [urlQuery])

  useEffect(() => {
    fetchStationList()
  }, [])

  const fetchStationList = () => {
    setIsLoading(true)
    fetch(
      `https://api.bart.gov/api/stn.aspx?cmd=stns&key=${CONSTANTS.BART.APIKEY}&json=y`
    )
      .then(res => res.json())
      .then(
        result => {
          setStationList(result.root.stations.station)
          setIsLoading(true)
          //   console.log("Fetched station list: ", result.root.stations.station)
        },
        error => {
          console.log("ERROR - fetchStationList: ", error)
        }
      )
  }

  const fetchData = url => {
    setIsLoading(true)
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          //   console.log("Fetch result: ", result)
          setBartData(result)
          setIsLoading(false)
        },
        error => {
          console.log(error)
        }
      )
  }

  const updateStationList = (e, isStartingStation) => {
    const station = e.target.value
    isStartingStation
      ? setSelectedStartStation(station)
      : setSelectedDestStation(station)
  }

  return (
    <div>
      {stationList[selectedStartStation] && (
        <p>Selected start station: {stationList[selectedStartStation].abbr}</p>
      )}
      {/* {stationList[selectedDestStation] && (
        <p>Selected end station: {stationList[selectedDestStation].abbr}</p>
      )} */}

      <StationListForm
        stationList={stationList}
        onSelect={updateStationList}
        selectedStartStation={selectedStartStation}
        selectedDestStation={selectedDestStation}
      />

      {isLoading && <img className="loading-img" width="30" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab79a231234507.564a1d23814ef.gif" alt="Loading..." />}

      {bartData?.root?.station &&
        bartData.root.station[0].etd.map(station => (
          <div key={station.destination}>
            <h3 key={station.destination}>{station.destination}</h3>
            <ul>
              {station.estimate.map(estimate => (
                <li key={estimate.minutes}>
                  {estimate.direction} {estimate.minutes}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  )
}

export default Bart
