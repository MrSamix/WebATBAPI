import { useContext } from "react";
import { AuthContext, type AuthContextType } from "../../../context/AuthContext";
import APP_ENV from "../../../env";

function ProfilePage() {
    const { user } = useContext(AuthContext) as AuthContextType;
    if (!user) {
        return <p className={"text-lg text-center dark:text-white"}>Користувач не знайдений.</p>;
    }
    return (
        <div>
            <h1 className={"text-4xl font-extrabold text-center mb-8 my-4 dark:text-white"}>Профіль користувача</h1>
            <p className={"text-lg text-center dark:text-white"}>Ласкаво просимо до вашого профілю, {user?.name}!</p>
            <img src={`${APP_ENV.API_IMAGE_URL}1200_${user?.image}`} alt={user?.name} className="my-3 w-128 h-128 rounded-full mx-auto object-cover" />
            <p className={"text-lg text-center my-3 dark:text-white"}>Ролі: {user?.roles.join(", ")}</p>
            <p className={"text-lg text-center my-3 dark:text-white"}>Email: {user?.email}</p>
        </div>
    )
}

export default ProfilePage;