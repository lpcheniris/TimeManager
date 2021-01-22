import moment from "moment"
import numeral from "numeral"

export const convertTimeTOSeconds = (time) => {
  return moment.duration(time)._milliseconds / 1000
}

export const convertSecondsTOTime = (time) => {
  return numeral(time).format("00:00:00")
}

export const convertTimePeriodToString = (startTime, endTime) => {
  let isCorrect = handleTimeError(startTime, endTime)
  if (isCorrect instanceof Error) {
    return "00:00:00"
  } else {
    let diffTime = endTime.diff(startTime)
    let duration = moment.duration(diffTime)
    let durationHours = numeral(duration.hours()).format("00");
    let durationMinutes = numeral(duration.minutes()).format("00");
    let durationSeconds = numeral(duration.seconds()).format("00");
    return durationHours + ":" + durationMinutes + ":" + durationSeconds
  }
}

export const convertTimePeriodToSeconds = (startTime, endTime) => {
  let isCorrect = handleTimeError(startTime, endTime)
  if (isCorrect instanceof Error) {
    return 0
  } else {
    let diffTime = endTime.diff(startTime)
    let duration = moment.duration(diffTime)
    return duration.seconds() + duration.hours() * 60 * 60 + duration.minutes() * 60
  }
}

export const handleTimeError = (startTime, endTime) => {
  if (!moment.isMoment(startTime) || !moment.isMoment(endTime)) {
    return new Error("Start Time or End Time is not a Moment instance")
  } else if (startTime.isAfter(endTime)) {
    return new Error("Start Time after End Time")
  } else {
    return null
  }
}