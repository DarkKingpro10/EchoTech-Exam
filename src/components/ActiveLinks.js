import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useProfile } from "../context/profileContext";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";
const isActive = (URL, pageName) => {
    const router = useRouter();
    if (router.asPath.includes(URL) && pageName != "Inicio") {
        return true;
    }
    return false;
};

const normalLinks = (routes) => {
    return routes.map(([route, href], index) => (
        <li key={index} className="nav-btn-container">
            <Link
                href={href}
                className={
                    isActive(href, route)
                        ? "active btn btn-nav waves-effect waves-light"
                        : "btn-nav btn waves-effect waves-light"
                }
                id={route}
            >
                {route}
            </Link>
        </li>
    ));
};

function LoginLinks(profile) {
    return (
        <>
            <li className="nav-btn-container">
                <Link
                    href={"/"}
                    className={
                        isActive("/", "Inicio")
                            ? "active btn btn-nav waves-effect waves-light"
                            : "btn-nav btn waves-effect waves-light"
                    }
                    id="Inicio"
                >
                    Inicio
                </Link>
            </li>
            <li className="nav-btn-container">
                <Link
                    href={"/perfil"}
                    className={
                        isActive("/perfil", "perfil")
                            ? "active btn btn-nav-profile waves-effect waves-light tooltipped"
                            : " btn-nav-profile btn waves-effect waves-light tooltipped"
                    }
                    data-position="bottom"
                    data-tooltip="Ir a perfil"
                >
                    {profile.userName}
                </Link>
            </li>
            <li>
                <Link href={"/perfil"}>
                    <Image
                        src={`/profile${profile.image}.jpg`}
                        width="60"
                        height="60"
                        className={
                            styles.navIcon +
                            " tooltipped " +
                            styles.profilePicture
                        }
                        data-position="bottom"
                        data-tooltip="Ir a perfil"
                        alt="NavBar icon"
                        priority
                        id="profilePicture"
                    />
                </Link>

            </li>
        </>
    );
}

function ActiveLink() {
    const { profile } = useProfile();
    var routes = null;
    if (profile.login) {
        routes = [
            ["Inicio", "/"],
            ["Perfil", "/perfil"],
        ];
    } else {
        routes = [
            ["Inicio", "/"],
            ["Registro", "/registro"],
            ["login", "login"],
        ];
    }

    return routes.length > 2 ? normalLinks(routes) : LoginLinks(profile);
}

export default ActiveLink;
