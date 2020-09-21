import moment from "moment"
import numeral from "numeral"

export const convertTimeTOSeconds = (time) => {
  return moment.duration(time)._milliseconds/1000
}

export const convertSecondsTOTime = (time) => {
  return numeral(time).format("00:00:00")
}