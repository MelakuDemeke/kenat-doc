/**
 * Everyday Amharic name for the part of the day, from the Gregorian hour (0–23).
 * kenat's Time only reports "day" or "night"; people actually say ጠዋት, ከሰዓት,
 * ምሽት and ሌሊት, so the site labels times with these four.
 */
export function dayPart(gregorianHour) {
  if (gregorianHour >= 6 && gregorianHour < 12) return { am: "ጠዋት", en: "Morning", night: false };
  if (gregorianHour >= 12 && gregorianHour < 18) return { am: "ከሰዓት", en: "Afternoon", night: false };
  if (gregorianHour >= 18) return { am: "ምሽት", en: "Evening", night: true };
  return { am: "ሌሊት", en: "Night", night: true };
}
