import { FiPackage, FiCalendar, FiClock } from 'react-icons/fi'

const withIcon = (Icon, label) => (
    <span className="flex items-center gap-2">
        <Icon /> {label}
    </span>
)

export default {
    Installation: withIcon(FiPackage, "Installation"),
    MonthGrid: withIcon(FiCalendar, "Month Grid"),
    DatePicker: withIcon(FiCalendar, "Date Picker"),
    DateConverter: withIcon(FiCalendar, "Date Converter"),
    Clock: withIcon(FiClock, "Clock"),
    TimeConverter: withIcon(FiClock, "Converter")
}
