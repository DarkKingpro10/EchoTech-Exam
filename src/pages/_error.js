import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Custom404() {
    useEffect(() => {
        let t1 = gsap.timeline();
        let t2 = gsap.timeline();
        let t3 = gsap.timeline();
        let t4 = gsap.timeline();
        let t5 = gsap.timeline();

        t1.to(".cog1", {
            transformOrigin: "50% 50%",
            rotation: "+=360",
            repeat: -1,
            ease: Linear.easeNone,
            duration: 20,
        });

        t2.to(".cog2", {
            transformOrigin: "50% 50%",
            rotation: "-=360",
            repeat: -1,
            ease: Linear.easeNone,
            duration: 20,
        });

        t3.fromTo(
            ".wrong-para",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 3,
                stagger: {
                    repeat: -1,
                    yoyo: true,
                },
            }
        );

        t4.fromTo(
            ".wrong-para2",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 3,
                stagger: {
                    repeat: -1,
                    yoyo: true,
                },
            }
        );

        t5.fromTo(
            ".RegresarFx",
            {
                opacity: 0,
            },
            {
                opacity: 1,
                duration: 7,
                stagger: {
                    repeat: 0,
                    yoyo: true,
                },
            }
        );
    }, []);
    return (
        <div id="notFound404">
            <Head>
                <title>Error</title>
            </Head>
            <div className="container">
                <h1 className="first-four">4</h1>
                <div className="cog-wheel1">
                    <div className="cog1">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <div className="cog-wheel2">
                    <div className="cog2">
                        <div className="top"></div>
                        <div className="down"></div>
                        <div className="left-top"></div>
                        <div className="left-down"></div>
                        <div className="right-top"></div>
                        <div className="right-down"></div>
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <h1 className="second-four">4</h1>
            </div>
            <div>
                <div className="wrong-para">
                    <p>Error 404</p>
                    <p>¡Oh no! Página no encontrada u ocurrió un error de red!</p>
                </div>
                <div className="center-align RegresarFx">
                    <Link
                        href={"/"}
                        className="waves-effect waves-dark  btn center-align"
                        id="Regresar"
                    >
                        Regresar
                    </Link>
                </div>
            </div>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js"></script>
        </div>
    );
}
