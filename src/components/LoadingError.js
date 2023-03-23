import Link from "next/link";
import Head from "next/head";
export default function LoadingError() {
    return (
        <div id="notFound404">
            <Head>
                <title>Error</title>
            </Head>
            <div className="container">
                <div>
                    <div className="wrong-para">
                        <p>Error Desconocido</p>
                        <p>
                            ¡Oh no! Página no encontrada u ocurrió un error de
                            red! Regrese más tarde
                        </p>
                    </div>
                    <div className="center-align RegresarFx">
                        <Link
                            href={"/login"}
                            className="waves-effect waves-dark  btn center-align"
                            id="Regresar"
                        >
                            Regresar
                        </Link>
                    </div>
                </div>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.3.1/gsap.min.js"></script>
            </div>
        </div>
    );
}
