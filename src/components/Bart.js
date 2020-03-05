import React, { useState, useEffect } from "react"
import StationListForm from "./StationListForm"
import Results from "./Results"
import Utils from "./Utils"
import _ from "lodash"

import "./bart.scss"

const CONSTANTS = Utils.CONSTANTS

const Bart = () => {
  const defaultStations = JSON.parse(localStorage.getItem("savedStations")) || {
    startStation: 4,
    destStation: 7,
  }
  const [isLoading, setIsLoading] = useState(false)
  const [bartData, setBartData] = useState([])
  const [stationList, setStationList] = useState([])
  const [routeData, setRouteData] = useState([])
  const [urlQuery, setUrlQuery] = useState(CONSTANTS.BART.INITIAL_URL)
  const [selectedStations, setSelectedStations] = useState(defaultStations)

  const updateUrlQuery = (stationList, selectedStations) => {
    stationList.length > 0 &&
      setUrlQuery(
        `${CONSTANTS.BART.BASE_URL.DEPART}orig=${
          stationList[selectedStations.startStation].abbr
        }&dest=${stationList[selectedStations.destStation].abbr}&key=${
          CONSTANTS.BART.API_KEY
        }&json=y`
      )
  }

  const fetchData = (url, hook, objPath) => {
    setIsLoading(true)
    console.log("API CALL")
    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          hook(_.get(result, `root.${objPath}`))
          setIsLoading(false)
        },
        error => {
          console.log("ERROR - fetchData: ", error)
        }
      )
  }

  console.log(bartData)

  // --- USE EFFECTS ---

  // Update url query
  useEffect(() => {
    updateUrlQuery(stationList, selectedStations)
  }, [stationList, selectedStations])

  // Fetch stationData
  useEffect(() => {
    fetchData(
      `https://api.bart.gov/api/stn.aspx?cmd=stns&key=${CONSTANTS.BART.API_KEY}&json=y`,
      setStationList,
      "stations.station"
    )
  }, [])

  // Fetch bartData
  useEffect(() => {
    fetchData(urlQuery, setBartData, "schedule.request.trip")
  }, [urlQuery])

  // Fetch routeData
  useEffect(() => {
    fetchData(
      `https://api.bart.gov/api/route.aspx?cmd=routes&key=${CONSTANTS.BART.API_KEY}&json=y`,
      setRouteData,
      "routes.route"
    )
  }, [])

  return (
    <div className="bart">
      <StationListForm
        stationList={stationList}
        selectedStations={selectedStations}
        onClick={setSelectedStations}
      />

      {isLoading ? (
        <img
          className="loading-img"
          width="30"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ab79a231234507.564a1d23814ef.gif"
          alt="Loading..."
        />
      ) : (
        <Results
          bartData={bartData}
          routeData={routeData}
          stationList={stationList}
        />
      )}
    </div>
  )
}

export default Bart
