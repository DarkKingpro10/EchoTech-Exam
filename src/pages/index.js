import Slider from "@/components/Slider";
import Head from "next/head";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import styles from "../styles/Index.module.css";
import Link from "next/link";
import sweetAlert from "@/components/SweetAlert";
import LoadingError from "@/components/LoadingError";

export default function Index({ movies, statusCode }) {
    if (statusCode) {
        return (
            <>
                <LoadingError />
            </>
        );
    }
    useEffect(() => {
        try {
            document.getElementById("Inicio").classList.add("active");
        } catch (error) {}
    }, [0]);

    const [moviesData, setMovie] = useState(movies.results);
    const [search, setSearch] = useState(2);

    const fetchMovies = async (searchKey) => {
        let optionFilter = null;
        if (search == 2) {
            optionFilter = "trending/movie/week?";
        } else {
            optionFilter = "/discover/movie?";
        }

        const type = searchKey != "" ? "search/movie?" : optionFilter;
        const res = await fetch(
            `https://api.themoviedb.org/3/${type}api_key=f03ca09216b79d36538796c0d2aa886c&language=es&query=${searchKey}`
        );
        //console.log(`https://api.themoviedb.org/3/${type}api_key=f03ca09216b79d36538796c0d2aa886c&language=es&query=${searchKey}`);
        try {
            const data = await res.json();
            setMovie(data.results);
        } catch (error) {
            sweetAlert(
                3,
                "No se ha podido cargar las películas. Por favor intenta más tarde"
            );
        }
    };

    return (
        <Layout>
            <div className="row">
                <div
                    className={
                        "col s12 l4 offset-l4 white-text " + styles.banner
                    }
                >
                    Catalogo de películas
                </div>
            </div>
            <div className="row">
                <div className="col s12">
                    <h3 className="secundary-text">Top 5 más popular</h3>
                </div>
                <div className="col s12">
                    <div className="carousel">
                        <Slider data={movies} />
                    </div>
                </div>
            </div>

            <div className="row form-element">
                <form action="#" className="col s12 l8">
                    <p
                        onClick={() => {
                            setSearch(1);
                            fetchMovies("");
                        }}
                    >
                        <label>
                            <input name="group1" type="radio" />
                            <span className="black-text">
                                Descubrir(Aleatorio)
                            </span>
                        </label>
                    </p>
                    <p
                        onClick={() => {
                            setSearch(2);
                            fetchMovies("");
                        }}
                    >
                        <label>
                            <input
                                name="group1"
                                type="radio"
                                className="black-text"
                                defaultChecked
                            />
                            <span className="black-text">Tendencia</span>
                        </label>
                    </p>
                </form>
                <input
                    type="text"
                    id="nombreUsuario"
                    className={
                        "browser-default col s7 offset-s2 offset-m6 m4 l3"
                    }
                    required
                    placeholder="Buscador..."
                    onKeyUp={(e) => {
                        fetchMovies(e.target.value.trim());
                    }}
                />
                <i
                    className={
                        "material-icons tooltipped col s1 " + styles.search
                    }
                    data-tooltip="Buscar"
                    data-position="top"
                >
                    search
                </i>
            </div>
            <div className="row">
                {moviesData.slice(0, 10).map((movie, key) => (
                    <Link
                        href={{
                            pathname: "detallePelicula",
                            query: {
                                urlParams: movie.id,
                            },
                        }}
                        key={key}
                        className={"col s12 l4 m6 " + styles.containerMovies}
                        as={'detallePelicula/'+movie.title}
                    >
                        <div className={styles.movie_card}>
                            <span className={styles.movie_title}>
                                {movie.title}
                            </span>
                            <img
                                className={styles.img_movie}
                                src={`${process.env.IMG_ROUTE}${movie.poster_path}`}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=f03ca09216b79d36538796c0d2aa886c&language=es"
    );
    const data = await res.json();
    const statusCode = res.status > 200 ? res.status : false;
    return {
        props: {
            movies: data,
            statusCode,
        },
    };
}
