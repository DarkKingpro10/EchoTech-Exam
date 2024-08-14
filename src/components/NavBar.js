import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import logo from "../../public/logo.png";
import styles from "../styles/NavBar.module.css";
import ActiveLink from "./ActiveLinks";

export default function NavBar() {
    let router = useRouter();
    useEffect(() => {
        window.M.Sidenav.init(document.querySelectorAll(".sidenav"));
        window.M.Tooltip.init(document.querySelectorAll(".tooltipped"), {
            margin: 25,
        });
    });
    return (
        <>
            <nav>
                <div className={styles.nav + " nav-wrapper primary-color"}>
                    <Link href={"/"}>
                        <img
                            src="/navBar-icon.png"
                            className={styles.navIcon + " hide-on-small-only"}
                            alt="NavBar icon"
                        />
                    </Link>
                    <a href="/" className={"brand-logo " + styles.branLogo}>
                        Echo Flix
                    </a>
                    <a data-target="mobile-demo" className="sidenav-trigger">
                        <i className="material-icons">menu</i>
                    </a>
                    <ul
                        className={
                            "right hide-on-med-and-down " +
                            styles.buttonContainer
                        }
                    >
                        <ActiveLink />
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <Link href={"/"}>
                    <img
                        src={logo}
                        className={"responsive-image " + styles.logoMobile}
                        alt="NavBar icon"
                    />
                </Link>
                <ActiveLink />
            </ul>
        </>
    );
}
