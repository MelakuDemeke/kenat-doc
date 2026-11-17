/**
 * Question-and-answer content for answer engines (featured snippets, AI Overviews,
 * ChatGPT / Perplexity / Claude). Each answer opens with a direct one-sentence answer,
 * then adds detail. Rendered visibly by <FaqSection> and mirrored as FAQPage JSON-LD.
 * Calendar facts here are checked against the kenat library (toGC / toEC).
 */

export const HOME_FAQS = [
  {
    q: "What is Kenat?",
    a: "Kenat (Amharic: ቀናት, \"days\") is a free, open-source Ethiopian calendar toolkit. It converts dates between the Ethiopian and Gregorian calendars, lists Ethiopian holidays, computes Bahire Hasab and writes Ge'ez numerals, with the same engine published for JavaScript/TypeScript, Python, Dart/Flutter, PHP and the command line under the MIT license.",
  },
  {
    q: "How does the Ethiopian calendar work?",
    a: "The Ethiopian calendar has 13 months: twelve months of 30 days and a short thirteenth month, Pagume, of 5 days, or 6 days in a leap year. The year starts on Meskerem 1, which is September 11 in the Gregorian calendar, or September 12 in the year after an Ethiopian leap year.",
  },
  {
    q: "Why is the Ethiopian calendar 7 or 8 years behind the Gregorian calendar?",
    a: "The Ethiopian calendar counts years from a different calculation of the year of the Annunciation, so it runs 7 years behind the Gregorian calendar from Meskerem 1 (September 11 or 12) to December 31, and 8 years behind from January 1 until the next Ethiopian New Year.",
  },
  {
    q: "When is an Ethiopian leap year?",
    a: "An Ethiopian year is a leap year when the year divided by 4 leaves a remainder of 3, for example 2015 and 2019 E.C. In a leap year Pagume has 6 days instead of 5, and the next Ethiopian New Year falls on September 12 instead of September 11.",
  },
  {
    q: "How do I convert an Ethiopian date to a Gregorian date in code?",
    a: "Install Kenat with npm install kenat, then call toGC(year, month, day) to convert an Ethiopian date to Gregorian, or toEC(year, month, day) for the other direction. For example, toGC(2019, 1, 1) returns September 11, 2026. The Python, Dart and PHP packages provide the same toGC and toEC functions.",
  },
  {
    q: "Is Kenat free to use?",
    a: "Yes. The Kenat libraries are open source under the MIT license and free for personal and commercial projects. The Kenat app for Android and Windows is also free, with an optional Pro subscription for sync and extra features.",
  },
];

export const DATE_CONVERTER_FAQS = [
  {
    q: "How do I convert an Ethiopian date to Gregorian?",
    a: "Enter the Ethiopian year, month (1–13) and day in the Ethiopian to Gregorian box above and the Gregorian date appears instantly. The converter handles Pagume, the 13th month, and Ethiopian leap years.",
  },
  {
    q: "What is today's date in the Ethiopian calendar?",
    a: "The converter opens on today's date in both calendars. You can also see today's Ethiopian date, weekday and Ethiopian time on the Today page at kenat.et/today.",
  },
  {
    q: "What Gregorian date is Ethiopian New Year (Meskerem 1)?",
    a: "Meskerem 1, the Ethiopian New Year (Enkutatash), falls on September 11 in most years and on September 12 in the year after an Ethiopian leap year. For example, Meskerem 1, 2019 E.C. was September 11, 2026, and Meskerem 1, 2020 E.C. is September 12, 2027.",
  },
  {
    q: "How many months does the Ethiopian calendar have?",
    a: "Thirteen. Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miazia, Ginbot, Sene, Hamle and Nehase have 30 days each, and Pagume has 5 days, or 6 in a leap year.",
  },
];

export const TIME_CONVERTER_FAQS = [
  {
    q: "How does Ethiopian time work?",
    a: "Ethiopian time counts two 12-hour cycles that start at sunrise and sunset instead of midnight and noon. 6:00 AM in standard time is 12:00 in the morning in Ethiopian time, and 7:00 AM is 1:00 in the morning.",
  },
  {
    q: "How do I convert standard time to Ethiopian time?",
    a: "Subtract 6 hours from the standard 12-hour clock time and keep the day or night period. For example, 8:00 AM is 2:00 in the morning (ጠዋት) Ethiopian time, and 9:00 PM is 3:00 at night (ማታ).",
  },
  {
    q: "Is Ethiopian time still used today?",
    a: "Yes. Ethiopian time is used in everyday speech, on many local clocks and in traditional settings across Ethiopia, while standard time is common in aviation, international business and some official contexts.",
  },
];

export const BAHIRE_HASAB_FAQS = [
  {
    q: "What is Bahire Hasab?",
    a: "Bahire Hasab (ባሕረ ሐሳብ) is the traditional Ethiopian Orthodox method for calculating the dates of movable fasts and feasts each year, such as the Fast of Nineveh, Lent (Abiy Tsom), Hosanna, Good Friday and Fasika (Easter).",
  },
  {
    q: "How is the date of Ethiopian Easter (Fasika) calculated?",
    a: "Bahire Hasab derives a set of yearly values from the Ethiopian year, including the Evangelist of the year, Abektie, Metqi, Beale Metqi and Mebaja Hamer, which fixes the start of the Fast of Nineveh; Lent and Fasika are then counted from Nineveh. Kenat performs the full calculation for any year with getBahireHasab().",
  },
  {
    q: "Why is Ethiopian Easter on a different date from Western Easter?",
    a: "Ethiopian Orthodox Easter is computed with Bahire Hasab on the Julian-based Alexandrian reckoning, while most Western churches use the Gregorian computus, so the two dates usually differ by one to five weeks and only sometimes coincide.",
  },
];

export const HOLIDAY_BROWSER_FAQS = [
  {
    q: "How many holidays are there in the Ethiopian calendar?",
    a: "Kenat computes 23 holidays for the Ethiopian year 2019 E.C., counting fixed national holidays, movable Orthodox feasts calculated with Bahire Hasab, and Muslim holidays that follow the lunar Hijri calendar. The number changes slightly from year to year because the movable and lunar holidays shift.",
  },
  {
    q: "Which Ethiopian holidays move every year?",
    a: "Orthodox feasts tied to Easter, such as Hosanna, Good Friday (Siklet) and Fasika, move every year and are calculated with Bahire Hasab. Muslim holidays such as Eid al-Fitr, Eid al-Adha and Moulid (Mawlid) also move, about 11 days earlier each year, because they follow the lunar calendar.",
  },
  {
    q: "When is Ethiopian Christmas (Gena)?",
    a: "Gena, Ethiopian Christmas, falls on Tahsas 29 in the Ethiopian calendar, which is January 7 in the Gregorian calendar in most years. In 2019 E.C. it is on January 7, 2027.",
  },
];

export const MONTH_GRID_FAQS = [
  {
    q: "What are the 13 months of the Ethiopian calendar?",
    a: "The Ethiopian months are Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miazia, Ginbot, Sene, Hamle, Nehase and Pagume. The first twelve have 30 days each, and Pagume has 5 days, or 6 in a leap year.",
  },
  {
    q: "What is Pagume?",
    a: "Pagume (ጳጉሜ) is the thirteenth and last month of the Ethiopian year. It has 5 days, or 6 days in a leap year, and falls in early September in the Gregorian calendar, just before the Ethiopian New Year on Meskerem 1.",
  },
  {
    q: "On which Gregorian date does each Ethiopian month start?",
    a: "Ethiopian months start between the 6th and the 12th of a Gregorian month. For example, Hidar 1, 2019 E.C. is November 10, 2026. The exact day shifts by one around Ethiopian leap years, so the month view shows the Gregorian date on every day.",
  },
];
