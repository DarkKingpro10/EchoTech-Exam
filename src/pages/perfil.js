import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useProfile } from "../context/profileContext";
import sweetAlert, { confirmationSwal } from "@/components/SweetAlert";
import styles from "../styles/Perfil.module.css";
import registerIMG from "../../public/registerImage.png";
import Logo from "../../public/logo.png";
import profile1 from "../../public/profile1.jpg";
import profile2 from "../../public/profile2.jpg";
import profile3 from "../../public/profile3.jpg";

export default function Perfil() {
    const { profile, setUpdate } = useProfile();
    const router = useRouter();
    try {
        if (!profile.login) {
            router.push("/");
        }
    } catch (e) {}

    useEffect(()=>{
        document.getElementById(`RB${profile.image}`).classList.add("activeRB");
    },[])

    const [usuario, setUsuario] = useState(profile.userName);
    const [password, setPassword] = useState(profile.password);
    const [eyePass, setEyePass] = useState("visibility_off");
    const [picture, setPicture] = useState(profile.image);

    const changeEyesPass = () => {
        if (eyePass == "visibility_off") {
            document.getElementById("contraUsuario").type = "text";
            setEyePass("visibility");
        } else {
            document.getElementById("contraUsuario").type = "password";
            setEyePass("visibility_off");
        }
    };

    const logOut = async (e) => {
        e.preventDefault();
        let response = await confirmationSwal("¿Esta seguro de cerrar sesión");
        if (response) {
            setUpdate({
                ...profile,
                login: false,
            });
            router.push("/login");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usuario != password) {
            let response = await confirmationSwal(
                "¿Esta seguro de actualizar tu cuenta?"
            );
            if (response) {
                setUpdate({
                    login: 'true',
                    userName: usuario,
                    password: password,
                    image: picture,
                });
            }
        } else {
            sweetAlert(
                2,
                "La contraseña no puede ser igual al usuario por seguridad"
            );
        }
    };

    return (
        <Layout title="Perfil">
            <div className="row">
                <div className={"col l5 s12  " + styles.info}>
                    <img
                        src={`/profile${profile.image}.jpg`}
                        width={"200"}
                        height={"200"}
                        className={
                            "col s6 offset-s3 responsive-img " +
                            styles.profilePicture
                        }
                        alt="Logo company"
                    />
                    <h1 className="col s12 primary-text center-align">
                        {profile.userName}
                    </h1>
                    <div className="col s12 primary-text center-align">
                        <h5>¿Desea cerrar sesión?</h5>
                    </div>
                    <button
                        onClick={logOut}
                        className={"col s6 offset-s3 " + styles.btnReiniciar}
                    >
                        Cerrar sesión
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
                            <img
                                src={"logo.png"}
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
                                    Actualiza tus credenciales
                                </h6>
                                <div className="row">
                                    <input
                                        value={usuario}
                                        type="text"
                                        id="usuario"
                                        className={
                                            "browser-default col l5 m5 s12"
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
                                            "browser-default col l6 offset-l1 m6 offset-m1 s12"
                                        }
                                        placeholder="Contraseña del usuario"
                                        onChange={(e) => {
                                            setPassword(e.target.value.trim());
                                        }}
                                    />
                                </div>
                                <div className="row">
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
                                <h6 className="third-text col s12">
                                    Actualiza la foto de perfil
                                </h6>
                                <div className="row">
                                    <div className="col s4">
                                        <img
                                            alt="Profile picture 2"
                                            src={"profile1.jpg"}
                                            className="responsive-img"
                                        />
                                    </div>
                                    <div className="col s4">
                                        <img
                                            alt="Profile picture 2"
                                            src={"profile2.jpg"}
                                            className="responsive-img"
                                        />
                                    </div>
                                    <div className="col s4">
                                        <img
                                            alt="Profile picture 3"
                                            src={"profile3.jpg"}
                                            className={
                                                "responsive-img " +
                                                styles.profileIMG
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={"row " + styles.contenedorRB}>
                                    <div
                                        className="col s4 image-RB"
                                        onClick={(e) => {
                                            setPicture(1);
                                            for (
                                                let i = 0;
                                                i <
                                                document.getElementsByClassName(
                                                    "image-RB"
                                                ).length;
                                                i++
                                            ) {
                                                //Obtenemos los componentes individuales
                                                let componente =
                                                    document.getElementsByClassName(
                                                        "image-RB"
                                                    )[i];
                                                componente.classList.remove(
                                                    "activeRB"
                                                );
                                            }
                                            document
                                                .getElementById("RB1")
                                                .classList.add("activeRB");
                                        }}
                                        id="RB1"
                                    >
                                        1
                                    </div>
                                    <div
                                        className="col s4 center image-RB"
                                        id="RB2"
                                        onClick={(e) => {
                                            setPicture(2);
                                            for (
                                                let i = 0;
                                                i <
                                                document.getElementsByClassName(
                                                    "image-RB"
                                                ).length;
                                                i++
                                            ) {
                                                //Obtenemos los componentes individuales
                                                let componente =
                                                    document.getElementsByClassName(
                                                        "image-RB"
                                                    )[i];
                                                componente.classList.remove(
                                                    "activeRB"
                                                );
                                            }
                                            document
                                                .getElementById("RB2")
                                                .classList.add("activeRB");
                                        }}
                                    >
                                        2
                                    </div>
                                    <div
                                        className="col s4 center image-RB"
                                        id="RB3"
                                        onClick={(e) => {
                                            setPicture(3);
                                            for (
                                                let i = 0;
                                                i <
                                                document.getElementsByClassName(
                                                    "image-RB"
                                                ).length;
                                                i++
                                            ) {
                                                //Obtenemos los componentes individuales
                                                let componente =
                                                    document.getElementsByClassName(
                                                        "image-RB"
                                                    )[i];
                                                componente.classList.remove(
                                                    "activeRB"
                                                );
                                            }
                                            document
                                                .getElementById("RB3")
                                                .classList.add("activeRB");
                                        }}
                                    >
                                        3
                                    </div>
                                </div>
                                <div
                                    className={
                                        "col s5 offset-s4 waves-effect waves-light " +
                                        styles.confirmContainer
                                    }
                                >
                                    <button
                                        type="submit"
                                        className="botones-confirm"
                                    >
                                        Actualizar datos
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
