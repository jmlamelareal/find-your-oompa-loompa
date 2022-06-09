export class DateHelper {
  static isOlderThanNHourAgo(date: number, hourAgo = 1) {
    const oneHourAgoInMs = 3600000

    const hourAgoInMs = oneHourAgoInMs * hourAgo

    const restHour = Date.now() + hourAgoInMs

    return date > restHour
  }
}
