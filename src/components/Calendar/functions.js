
export const getMonthDays = (year=2019, month=12) => {
  const newDate = new Date(year, month, 0)
  const newDate2 = new Date(year, month - 1, 1)
  return {
    days: newDate.getDate(),
    firstDayInWeek: newDate2.getDay(),
  }
}

export const generateDays = (year, month, firstDayInWeek=0, days=30, daysLastMonth) => {
  let i = 0
  const realFirstDay = firstDayInWeek - 1
  const allDay = days + firstDayInWeek
  const restDaysTo7 = ( 7 - allDay % 7)
  const res = {
    year, month,
    days: []
  }
  const DAYS = allDay % 7 === 0 ? allDay : allDay + restDaysTo7
  while(i < DAYS) {
    if(i >= firstDayInWeek && i < allDay) {
      res.days[i] = { dayId: i, date: i - realFirstDay, isThisMonth: true, isChosen: false,  month, }
    } else if(i < firstDayInWeek) {
      res.days[i] = { dayId: i, date: daysLastMonth - realFirstDay + i, isThisMonth: false, isChosen: false,  month: month - 1  }
    } else {
      res.days[i] = { dayId: i, date: i - days - realFirstDay, isThisMonth: false, isChosen: false, month: month + 1 }
    }
    i++
  }
  return res
}

export const getWholeMonthDates = (year, month) => {
  const monthDays = getMonthDays(year, month)
  const lastMonthDays = month === 0 ? getMonthDays(year - 1, 12) : getMonthDays(year, month - 1)
  return generateDays(year, month, monthDays.firstDayInWeek, monthDays.days, lastMonthDays.days)
}
