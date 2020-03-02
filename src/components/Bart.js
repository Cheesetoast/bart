import React, { useState, useEffect } from "react"
import StationListForm from "./StationListForm"
import Results from "./Results"
import _ from "lodash"

import "./bart.scss"

const CONSTANTS = {
  BART: {
    APIKEY: "MW9S-E7SL-26DU-VV8V",
    BASEURL: {
      STATION: "https://api.bart.gov/api/etd.aspx?cmd=etd&",
      DEPART: "https://api.bart.gov/api/sched.aspx?cmd=depart&b=0&",
    },
  },
}

const Bart = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [bartData, setBartData] = useState([])
  const [stationList, setStationList] = useState([])
  const [selectedStartStation, setSelectedStartStation] = useState(4)
  const [selectedDestStation, setSelectedDestStation] = useState(7)
  const [urlQuery, setUrlQuery] = useState(
    "https://api.bart.gov/api/sched.aspx?cmd=depart&b=0&orig=phil&dest=bayf&key=MW9S-E7SL-26DU-VV8V&json=y"
  )

  const updateUrlQuery = (
    stationList,
    selectedStartStation,
    selectedDestStation
  ) => {
    stationList.length > 0 &&
      setUrlQuery(
        `${CONSTANTS.BART.BASEURL.DEPART}orig=${stationList[selectedStartStation].abbr}&dest=${stationList[selectedDestStation].abbr}&key=${CONSTANTS.BART.APIKEY}&json=y`
      )
  }

  const getStationName = value => {
    const criteria = { abbr: value }
    const key = Object.keys(criteria)[0]

    return stationList.find(function(elem) {
      return elem[key] === criteria[key]
    }).name
  }

  const fetchData = (url, hook, objPath) => {
    setIsLoading(true)
    console.log("API CALL")
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          hook(_.get(result, objPath))
          setIsLoading(false)
        },
        error => {
          console.log("ERROR - fetchData: ", error)
        }
      )
  }

  const updateSelectedStation = (e, isStartingStation) => {
    const station = e.target.value
    isStartingStation
      ? setSelectedStartStation(station)
      : setSelectedDestStation(station)
  }

  useEffect(() => {
    console.log("fetchStationlist")
    fetchData(
      `https://api.bart.gov/api/stn.aspx?cmd=stns&key=${CONSTANTS.BART.APIKEY}&json=y`,
      setStationList,
      "root.stations.station"
    )
  }, [])

  useEffect(() => {
      console.log("updateUrlQuery")
    updateUrlQuery(stationList, selectedStartStation, selectedDestStation)
  }, [stationList, selectedStartStation, selectedDestStation])

  useEffect(() => {
    console.log("fetchBartData")
    fetchData(urlQuery, setBartData, "root.schedule.request.trip")
  }, [urlQuery])

  return (
    <div className="bart">
      <StationListForm
        stationList={stationList}
        onSelect={updateSelectedStation}
        selectedStartStation={selectedStartStation}
        selectedDestStation={selectedDestStation}
      />

      {isLoading ? (
        <img
          className="loading-img"
          width="30"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab79a231234507.564a1d23814ef.gif"
          alt="Loading..."
        />
      ) : (
        bartData && <Results data={bartData} getStationName={getStationName} />
      )}
    </div>
  )
}

export default Bart
