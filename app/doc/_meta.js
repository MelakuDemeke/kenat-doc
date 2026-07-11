import { FiPackage, FiSettings, FiFeather, FiBookOpen, FiMonitor } from 'react-icons/fi'
import { FaRocket, FaToolbox, FaGift, FaWater, FaPalette } from 'react-icons/fa'

const withIcon = (Icon, label) => (
    <span className="flex items-center gap-2">
        <Icon /> {label}
    </span>
)

export default {
    installation: withIcon(FiPackage, "Installation"),
    GettingStarted: withIcon(FaRocket, "Getting Started"),
    usage: withIcon(FaToolbox, "Usage Examples"),
    apiref: withIcon(FiSettings, "Kenat Class"),
    formating: withIcon(FiFeather, "Formatting"),
    HolidaySystem: withIcon(FaGift, "Holiday System"),
    bahireHasab: withIcon(FaWater, "Bahire Hasab"),
    "Kenat-UI": withIcon(FaPalette, "Kenat UI"),
    "kenat-cli": withIcon(FiMonitor, "Kenat CLI"),
    examples: withIcon(FiBookOpen, "Examples"),
}