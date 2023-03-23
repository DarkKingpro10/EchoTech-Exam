import { Router } from "next/router";
import nProgress from "nprogress";
import { useEffect } from "react";
import NavBar from "./NavBar";
import Head from "next/head";
export default function Layout({ children, title='Echo Flix' }) {
    useEffect(() => {
        const handleRouteChange = (url) => {
            nProgress.start();
        };

        Router.events.on("routeChangeStart", handleRouteChange);

        Router.events.on("routeChangeComplete", () => nProgress.done());

        Router.events.on("routeChangeError", () => nProgress.done());

        return () => {
            Router.events.off("routeChangeStart", handleRouteChange);
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <NavBar/>
            <main className="container">
                {children}
            </main>
        </>
    );
}
