import Layout from "../components/Layout";
import styles from "../styles/detallePelicula.module.css";
import LoadingError from "@/components/LoadingError";
import { useRouter } from "next/router";
import sweetAlert from "@/components/SweetAlert";
import { useProfile } from "../context/profileContext";
function getColor(numero) {
    console.log()
    if (numero>=8) {
        return 'green accent-4'
    }else{
        if (numero>=6) {
            return 'yellow accent-4'
        }else{
            return 'deep-orange accent-4'
        }
    }
}

export default function detallePelicula({ movieDetail, statusCode }) {
    const { profile, setUpdate } = useProfile();
    try {
        const router = useRouter();
        if (!profile.login) {
            router.push("/login");
            sweetAlert(3,'Debe iniciar sesión para poder visualizar el detalle de las películas');
        }
    } catch (e) {}
    if (statusCode) {
        return (
            <>
                <LoadingError />
            </>
        );
    }

    // Make url
    const imgUrl = process.env.IMG_ROUTE + movieDetail.backdrop_path;
    // Get lenguages
    const lenguajes = movieDetail.spoken_languages.map((element, key) => (
        <li key={key} className={styles.li_decoration}>
            {element.english_name}
        </li>
    ));
    return (
        <Layout>
            <div className={"row " + styles.container}>
                <div
                    className={
                        "col s12 l6 offset-l3 white-text " + styles.banner
                    }
                >
                    {movieDetail.title}
                </div>
                <div className={styles.detailContent + " row col-12"}>
                    <div className={"col s12 l5 left " + styles.infoContainer}>
                        <p>
                            <b>Sipnosis: </b>
                            {movieDetail.overview}
                        </p>
                        <p>
                            <b>Fecha de lanzamiento: </b>
                            {movieDetail.release_date}
                        </p>
                        <p>
                            <b>Valoración: </b>
                        </p>
                        <div className={styles.valoracion+` ${getColor(movieDetail.vote_average.toFixed(2))}`}>
                            {movieDetail.vote_average.toFixed(2)}
                        </div>
                        <p>
                            <b>Idiomas disponibles:</b>
                        </p>
                        <ul>{lenguajes}</ul>
                    </div>
                    <div className={"col s12 l6 " + styles.img_padding}>
                        <img className={"responsive-img"} src={imgUrl} />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/${context.query.urlParams}?api_key=${process.env.API_KEY}&language=es`
    );
    const data = await response.json();
    const statusCode = response.status > 200 ? response.status : false;
    return {
        props: {
            movieDetail: data,
            statusCode
        },
    };
}
