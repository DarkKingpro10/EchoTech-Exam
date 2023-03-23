import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useProfile } from "../context/profileContext";
import styles from "../styles/Login.module.css";
import Image from "next/image";
import Logo from "../../public/logo.png";
import Link from "next/link";
import sweetAlert from "@/components/SweetAlert";

export default function Login() {
    const { profile, setUpdate } = useProfile();
    try {
        const router = useRouter();
        if (profile.login) {
            router.push("/");
        }
    } catch (e) {}

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [eyePass, setEyePass] = useState("visibility_off");

    const changeEyesPass = () => {
        if (eyePass == "visibility_off") {
            document.getElementById("contraUsuario").type = "text";
            setEyePass("visibility");
        } else {
            document.getElementById("contraUsuario").type = "password";
            setEyePass("visibility_off");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((profile.userName == usuario) && (profile.password == password)) {
            sweetAlert(1, 'Login exitoso');
            setUpdate({
                ...profile,login: true
            });
        }else{
            sweetAlert(2, 'La contraseña o el usuario no son correctos');
        }
    };

    return (
        <Layout title="Inicio sesión">
            <div className="">
                <div
                    className={"col l12 offset-m2 m12 " + styles.logoContainer}
                >
                    <Image
                        src={Logo}
                        className={styles.logo}
                        alt="Logo company"
                    />
                </div>
                <div className={"col s12 white-text " + styles.banner}>
                    ¡Inicia Sesión!
                </div>
                <div className={"col s12 container " + styles.formContainer}>
                    <h6 className="secundary-text">Ingresa tus credenciales</h6>
                    <form className="form-element row" onSubmit={handleSubmit}>
                        <div className="col m6 l4 s10 offset-s2 offset-l2 inputs-containerL">
                            <input
                                type="text"
                                id="nombreUsuario"
                                className={"browser-default "}
                                required
                                placeholder="Nombre del usuario"
                                autoFocus
                                value={usuario}
                                onChange={(e) => {
                                    setUsuario(e.target.value.trim());
                                }}
                            />
                        </div>
                        <div className="col s8 offset-s2 m6 l4 offset-l1">
                            <input
                                type="password"
                                id="contraUsuario"
                                className={"browser-default "}
                                required
                                placeholder="Contraseña del usuario"
                                onChange={(e) => {
                                    setPassword(e.target.value.trim());
                                }}
                            />
                            <i
                                className={
                                    "material-icons tooltipped " +
                                    styles.eyePass
                                }
                                data-tooltip="Mostrar contraseña"
                                onClick={changeEyesPass}
                            >
                                {eyePass}
                            </i>
                        </div>
                        <div
                            className={
                                "col s12 waves-effect waves-light " +
                                styles.confirmContainer
                            }
                        >
                            <button type="submit" className="botones-confirm">
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    <div className="col s12">
                        <Link
                            href={"/passwordChange"}
                            className={"secundary-text " + styles.forgotP}
                        >
                            Olvide mi contraseña
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
