import React, { useState, useEffect } from "react"
import Utils from "./Utils"
import StationListForm from "./StationListForm"
import Results from "./Results"

import "./bart.scss"

const CONSTANTS = {
  BART: {
    APIKEY: "MW9S-E7SL-26DU-VV8V",
    BASEURL: {
      STATION: "https://api.bart.gov/api/etd.aspx?cmd=etd&",
      ARRIVE: "https://api.bart.gov/api/sched.aspx?cmd=depart&",
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
    "https://api.bart.gov/api/sched.aspx?cmd=depart&orig=phil&dest=bayf&key=MW9S-E7SL-26DU-VV8V&json=y"
  )

  const formatTime = Utils.formatTime

  const updateUrlQuery = (
    stationList,
    selectedStartStation,
    selectedDestStation
  ) => {
    stationList.length > 0 &&
      setUrlQuery(
        `${CONSTANTS.BART.BASEURL.ARRIVE}orig=${stationList[selectedStartStation].abbr}&dest=${stationList[selectedDestStation].abbr}&key=${CONSTANTS.BART.APIKEY}&json=y`
      )
  }

  const getStationName = value => {
    const criteria = { abbr: value }
    const key = Object.keys(criteria)[0]

    return stationList.find(function(elem) {
      return elem[key] === criteria[key]
    }).name
  }

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
    console.log("FETCH DATE URL: ", url)
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          //  console.log("Fetch result: ", result)
          setBartData(result)
          setIsLoading(false)
        },
        error => {
          console.log(error)
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
    fetchStationList()
  }, [])

  useEffect(() => {
    updateUrlQuery(stationList, selectedStartStation, selectedDestStation)
  }, [stationList, selectedStartStation, selectedDestStation])

  useEffect(() => {
    console.log("USE EFFECT - FETCH DATA")
    fetchData(urlQuery)
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
        bartData?.root?.schedule.request.trip && (
          <Results
            data={bartData.root.schedule.request.trip}
            getStationName={getStationName}
          />
        )
      )}
    </div>
  )
}

export default Bart
