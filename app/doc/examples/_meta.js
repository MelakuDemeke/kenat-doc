import { FiCalendar, FiClock } from 'react-icons/fi'
import { FaWater, FaGift } from 'react-icons/fa'

const withIcon = (Icon, label) => (
    <span className="flex items-center gap-2">
        <Icon /> {label}
    </span>
)

export default {
    "monthGrid": withIcon(FiCalendar, "Month Grid"),
    "dateConverter": withIcon(FiCalendar, "EC↔GC Date Converter"),
    "datePicker": withIcon(FiCalendar, "Date Picker"),
    "clock": withIcon(FiClock, "Ethiopian Clock"),
    "timeConverter": withIcon(FiClock, "Time Converter"),
    bahireHasab: withIcon(FaWater, "Bahire Hasab"),
    holidayExample: withIcon(FaGift, "Holiday Browser"),
}