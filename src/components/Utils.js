const Utils = {
  CONSTANTS: {
    BART: {
      API_KEY: "MW9S-E7SL-26DU-VV8V",
      BASE_URL: {
        STATION: "https://api.bart.gov/api/etd.aspx?cmd=etd&",
        DEPART: "https://api.bart.gov/api/sched.aspx?cmd=depart&b=0&",
      },
      INITIAL_URL:
        "https://api.bart.gov/api/sched.aspx?cmd=depart&b=0&orig=phil&dest=bayf&key=MW9S-E7SL-26DU-VV8V&json=y",
    },
  },
  formatTime: num => {
    const hours = Math.floor(num / 60)
    const minutes = num % 60
    const hourFormat = hours > 1 ? "hrs" : "hr"

    return num > 60
      ? `${hours}${hourFormat} ${minutes} mins`
      : `${minutes} mins`
  },
  toCssClass: str => {
    return str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.toLowerCase())
      .join("-")
  },

  findInObj: (searchValue, obj, objKey, returnValue) => {
    const criteria = { [objKey]: searchValue }
    const key = Object.keys(criteria)[0]

    return obj.find(function(elem) {
      return elem[key] === criteria[key]
    })[returnValue]
  },
}

export default Utils
