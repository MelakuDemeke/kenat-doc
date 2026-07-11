import { FiPackage, FiBookOpen } from 'react-icons/fi'
import { FaRocket, FaUserCog, FaTools } from 'react-icons/fa'

const withIcon = (Icon, label) => (
    <span className="flex items-center gap-2">
        <Icon /> {label}
    </span>
)

export default {
    introduction: withIcon(FiBookOpen, "Introduction"),
    installation: withIcon(FiPackage, "Installation"),
    usage: withIcon(FaRocket, "Usage Overview"),
    commands: withIcon(FiBookOpen, "Command Reference"),
    interactive: withIcon(FaUserCog, "Interactive Mode"),
    advanced: withIcon(FaTools, "Advanced Usage & Tips"),
}
