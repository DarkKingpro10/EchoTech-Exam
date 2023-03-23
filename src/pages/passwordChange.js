import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useProfile } from "../context/profileContext";
import sweetAlert, { confirmationSwal } from "@/components/SweetAlert";
import styles from "../styles/PassWordChange.module.css";
import Image from "next/image";
import Logo from "../../public/logo.png";

export default function Registro() {
    const { profile, setUpdate, PIN_Password } = useProfile();
    const router = useRouter();
    try {
        if (profile.login) {
            router.push("/");
        }
    } catch (e) {}

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [eyePass, setEyePass] = useState("visibility_off");
    const [PIN, setPIN] = useState("1");

    const changeEyesPass = () => {
        if (eyePass == "visibility_off") {
            document.getElementById("contraUsuario").type = "text";
            setEyePass("visibility");
        } else {
            document.getElementById("contraUsuario").type = "password";
            setEyePass("visibility_off");
        }
    };

    const reiniciarCr = async (e) => {
        e.preventDefault();
        let response = await confirmationSwal(
            "¿Esta seguro de reiniciar las credenciales?, deberás crearlas de nuevo"
        );
        if (response) {
            setUpdate({
                login: false,
                userName: "",
                password: "",
                image: 1,
            });
            router.push("/registro");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if((profile.password == password)){
            sweetAlert(3, '¡Has recordado tu contraseña!, esa es tu contraseña');
        }
        else if ((profile.userName == usuario) && (PIN_Password == PIN)) {
            sweetAlert(1, 'Cambio exitoso');
            setUpdate({
                ...profile, password: password
            });
        }else{
            sweetAlert(2, 'La contraseña o el PIN no son correctos');
        }
    };

    return (
        <Layout title="Recuperar contraseña">
            <div className="row">
                <div className={"col l5 s12 " + styles.info}>
                    <h2 className="primary-text center">
                        ¿Olvidaste la contraseña?
                    </h2>
                    <p className="primary-text container center-align">
                        Ya que esta es solo una prueba, decide si borrar tus
                        credenciales anteriores o modificar tu contraseña
                        actual. El pin necesario para reiniciar la contraseña es
                        'Root1L'
                    </p>
                    <button
                        onClick={reiniciarCr}
                        className={styles.btnReiniciar}
                    >
                        Reiniciar credenciales
                    </button>
                </div>
                <div className={"col l7 s12 " + styles.formPanel}>
                    <div className="row">
                        <div
                            className={
                                "col l1 m1 offset-m5 offset-l5 " +
                                styles.logoContainer
                            }
                        >
                            <Image
                                src={Logo}
                                className={styles.logo}
                                alt="Logo company"
                            />
                        </div>
                        <div className="container">
                            <form
                                className={
                                    "s12 form-element row " + styles.form
                                }
                                onSubmit={handleSubmit}
                            >
                                <h6 className="third-text col s12">
                                    Reinicia tus credenciales
                                </h6>
                                <div className="row">
                                    <input
                                        type="text"
                                        id="usuario"
                                        className={
                                            "browser-default col l6 offset-l5 s12"
                                        }
                                        required
                                        placeholder="Nombre del usuario"
                                        onChange={(e) => {
                                            setUsuario(e.target.value.trim());
                                        }}
                                    />
                                    <input
                                        type="password"
                                        id="contraUsuario"
                                        className={
                                            "browser-default col l6 offset-l5 s10"
                                        }
                                        required
                                        placeholder="Contraseña nueva del usuario"
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim());
                                        }}
                                    />
                                    <i
                                        className={
                                            "material-icons tooltipped col s1  " +
                                            styles.eyePass
                                        }
                                        data-tooltip="Mostrar contraseña"
                                        onClick={changeEyesPass}
                                    >
                                        {eyePass}
                                    </i>
                                    <input
                                        type="password"
                                        id="PIN"
                                        className={
                                            "browser-default col l6 offset-l5 s12 secundaryInput"
                                        }
                                        required
                                        placeholder="PIN-reinicio"
                                        onChange={(e) => {
                                            setPIN(e.target.value.trim());
                                        }}
                                    />
                                </div>
                                <div
                                    className={
                                        "col s5 offset-s6 waves-effect waves-light " +
                                        styles.confirmContainer
                                    }
                                >
                                    <button
                                        type="submit"
                                        className="botones-confirm"
                                    >
                                        Reiniciar contraseña
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
