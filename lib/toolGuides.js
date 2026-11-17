/**
 * Crawlable explanatory content for each /tools page: a direct answer, how to use the
 * tool, a worked example, the matching library call and related links. Rendered by
 * <ToolGuide> under the interactive widget. Example values were computed with kenat.
 */

const PACKAGES = [
  { label: "npm: kenat", href: "https://www.npmjs.com/package/kenat" },
  { label: "PyPI: kenat", href: "https://pypi.org/project/kenat/" },
  { label: "pub.dev: kenat", href: "https://pub.dev/packages/kenat" },
  { label: "GitHub source", href: "https://github.com/MelakuDemeke/kenat" },
];

export const TOOL_GUIDES = {
  "date-converter": {
    name: "Ethiopian date converter",
    answer:
      "The Kenat date converter turns any Ethiopian calendar date into its Gregorian equivalent and any Gregorian date into the Ethiopian calendar, including the 13th month Pagume and Ethiopian leap years.",
    steps: [
      "To go from Ethiopian to Gregorian, type the Ethiopian year, month (1–13) and day in the first box.",
      "To go the other way, type a Gregorian year, month and day in the second box.",
      "The converted date updates as you type. Both boxes open on today's date.",
    ],
    examples: [
      ["Meskerem 1, 2019 E.C. (Ethiopian New Year)", "September 11, 2026"],
      ["Tahsas 29, 2019 E.C. (Gena, Ethiopian Christmas)", "January 7, 2027"],
      ["January 19, 2027 (Timket)", "Tir 11, 2019 E.C."],
    ],
    code: `import { toGC, toEC } from 'kenat'

toGC(2019, 1, 1)   // { year: 2026, month: 9, day: 11 }
toEC(2027, 1, 19)  // { year: 2019, month: 5, day: 11 }`,
    docs: [
      { label: "Usage examples: converting dates", href: "/doc/usage" },
      { label: "Getting started with the Kenat class", href: "/doc/GettingStarted" },
      { label: "useDateConverter React hook", href: "/doc/Kenat-UI/DateConverter" },
    ],
    related: [
      { label: "Today's Ethiopian date", href: "/today" },
      { label: "Ethiopian calendar for this year", href: "/calendar" },
      { label: "Ethiopian time converter", href: "/tools/time-converter" },
    ],
  },

  "time-converter": {
    name: "Ethiopian time converter",
    answer:
      "The Kenat time converter changes standard 24-hour time into Ethiopian time, which counts two 12-hour cycles starting at sunrise (6:00 AM) and sunset (6:00 PM), and converts Ethiopian time back.",
    steps: [
      "Enter a time on the 24-hour clock, for example 14:30.",
      "Read the Ethiopian hour, minutes and period (day or night) beside it.",
      "Or enter an Ethiopian time and period to get the standard time.",
    ],
    examples: [
      ["06:00", "12:00 day (morning)"],
      ["07:00", "1:00 day"],
      ["14:30", "8:30 day"],
      ["21:00", "3:00 night"],
    ],
    code: `import { Time } from 'kenat'

Time.fromGregorian(14, 30)
// { hour: 8, minute: 30, period: 'day' }`,
    docs: [
      { label: "Formatting dates with Ethiopian time", href: "/doc/formating" },
      { label: "useTimeConverter React hook", href: "/doc/Kenat-UI/TimeConverter" },
      { label: "Live Ethiopian clock example", href: "/doc/examples/clock" },
    ],
    related: [
      { label: "Today's Ethiopian date and time", href: "/today" },
      { label: "Ethiopian date converter", href: "/tools/date-converter" },
    ],
  },

  "bahire-hasab": {
    name: "Bahire Hasab calculator",
    answer:
      "The Kenat Bahire Hasab calculator computes the Ethiopian Orthodox movable fasts and feasts for any Ethiopian year: the Evangelist of the year, the Fast of Nineveh, Lent, Hosanna, Good Friday, Fasika and the feasts that follow.",
    steps: [
      "Enter an Ethiopian year, for example 2019.",
      "Read the year's Evangelist and the calculated values behind the reckoning.",
      "See each movable feast with its Ethiopian and Gregorian date.",
    ],
    examples: [
      ["Evangelist of 2019 E.C.", "Luke (ሉቃስ)"],
      ["Fast of Nineveh (ጾመ ነነዌ)", "Yekatit 15, 2019 = February 22, 2027"],
      ["Lent begins (ዐቢይ ጾም)", "Yekatit 29, 2019 = March 8, 2027"],
      ["Fasika, Ethiopian Easter (ፋሲካ)", "Miazia 24, 2019 = May 2, 2027"],
    ],
    code: `import Kenat from 'kenat'

const bh = new Kenat('2019/1/1').getBahireHasab()
bh.evangelist.name          // 'ሉቃስ'
bh.movableFeasts.fasika     // Miazia 24, 2019 · 2 May 2027`,
    docs: [
      { label: "How Bahire Hasab works", href: "/doc/bahireHasab" },
      { label: "Interactive Bahire Hasab example", href: "/doc/examples/bahireHasab" },
      { label: "The holiday system", href: "/doc/HolidaySystem" },
    ],
    related: [
      { label: "Fasika date and countdown", href: "/holidays/fasika" },
      { label: "Ethiopian holidays this year", href: "/holidays" },
      { label: "Holiday browser", href: "/tools/holiday-browser" },
    ],
  },

  "holiday-browser": {
    name: "Ethiopian holiday browser",
    answer:
      "The Kenat holiday browser lists every Ethiopian holiday in a year, with fixed national holidays, movable Orthodox feasts and Muslim holidays, and lets you filter them by type.",
    steps: [
      "Pick an Ethiopian year.",
      "Tick the tags you want, such as public, religious, Christian or Muslim holidays.",
      "Read each holiday's name and its Ethiopian and Gregorian date.",
    ],
    examples: [
      ["Holidays computed for 2019 E.C.", "23"],
      ["Enkutatash (Ethiopian New Year)", "Meskerem 1, 2019 = September 11, 2026"],
      ["Gena (Ethiopian Christmas)", "Tahsas 29, 2019 = January 7, 2027"],
      ["Fasika (Ethiopian Easter)", "Miazia 24, 2019 = May 2, 2027"],
    ],
    code: `import { getHolidaysForYear } from 'kenat'

const holidays = getHolidaysForYear(2019)
holidays.length  // 23`,
    docs: [
      { label: "The holiday system and tags", href: "/doc/HolidaySystem" },
      { label: "Holiday browser example", href: "/doc/examples/holidayExample" },
    ],
    related: [
      { label: "Ethiopian holidays this year", href: "/holidays" },
      { label: "Enkutatash (Ethiopian New Year)", href: "/holidays/enkutatash" },
      { label: "Meskel", href: "/holidays/meskel" },
      { label: "Bahire Hasab calculator", href: "/tools/bahire-hasab" },
    ],
  },

  "month-grid": {
    name: "Ethiopian month calendar",
    answer:
      "The Kenat month view shows any Ethiopian month as a calendar grid, with the Gregorian date and holidays on each day, so you can read both calendars at once.",
    steps: [
      "Pick an Ethiopian year and month, or step forward and back a month at a time.",
      "Read each day's Ethiopian date with its Gregorian date beside it.",
      "Holidays are highlighted on the days they fall.",
    ],
    examples: [
      ["Hidar 1, 2019 E.C.", "Tuesday, November 10, 2026"],
      ["Days in Hidar", "30"],
      ["Days in Pagume, 2019 E.C. (a leap year)", "6"],
    ],
    code: `import { MonthGrid } from 'kenat'

const grid = MonthGrid.create({ year: 2019, month: 3, weekdayLang: 'english' })
grid.headers  // ['Monday', 'Tuesday', ...]
grid.days     // one entry per cell, holidays attached`,
    docs: [
      { label: "Generate a month grid", href: "/doc/usage" },
      { label: "useMonthGrid React hook", href: "/doc/Kenat-UI/MonthGrid" },
      { label: "Month grid example", href: "/doc/examples/monthGrid" },
    ],
    related: [
      { label: "Ethiopian calendar for this year", href: "/calendar" },
      { label: "Today's Ethiopian date", href: "/today" },
      { label: "Ethiopian date converter", href: "/tools/date-converter" },
    ],
  },
};

export { PACKAGES };
