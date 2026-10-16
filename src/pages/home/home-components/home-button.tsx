import MicrosoftLogo from '../../../assets/microsoft'
import { redirectToMicrosoftLogin, redirectToMicrosoftLogout } from '../../../utilities/microsoft-auth'
import "../home-style.css"

export default function HomeButton({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <div className="home-button ">
            {/* flex flex-row items-center gap-4 p-2 m-4 border-2 border-solid bg-white border-gray-400 rounded-sm cursor-pointer hover:bg-blue-600 hover:text-white hover:border-white transition duration-200 */}
            <div className="microsoft-svg"><MicrosoftLogo /></div>
            <p className="sign-in-with-microsoft-text" onClick={isLoggedIn ? redirectToMicrosoftLogin : redirectToMicrosoftLogout}> {isLoggedIn ? "Sign in with Microsoft" : "Sign out from Microsoft"} </p>
        </div>
    )
}