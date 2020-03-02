const Utils = {
  formatTime: num => {
    const hours = Math.floor(num / 60)
    const minutes = num % 60
    const hourFormat = hours > 1 ? "hrs" : "hr"

    return num > 60
      ? `${hours}${hourFormat} ${minutes} mins`
      : `${minutes} mins`
  },
}

export default Utils
