import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();


    async function handleLogout() {
        setIsLoading(true)
        localStorage.setItem("token", "");
        localStorage.setItem("role", "");
        navigate("/")
        setIsLoading(false)
    }

    useEffect(() => {
        handleLogout()
    }, [])
    return (
        <>
            {isLoading && <Loader />}
        </>
    )
}


export default Logout;