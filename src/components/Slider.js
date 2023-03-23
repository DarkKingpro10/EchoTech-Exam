import { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "../styles/CarouselSlide.module.css";
import Link from "next/link";

export default function Slider({ data }) {
    useEffect(() => {
        window.M.Materialbox.init(document.querySelectorAll(".materialboxed"));
    }, []);
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };
    return (
        <Carousel
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            showDots={true}
        >
            {data.results.slice(0, 5).map((movie, key) => (
                <Link
                    href={{
                        pathname: "detallePelicula",
                        query: {
                            urlParams: movie.id,
                        },
                    }}
                    key={key}
                    className={styles.containerSlide}
                    //as={'detallePelicula/'+movie.title}
                >
                    <div className={styles.slide_card}>
                        <span className={styles.slide_title}>
                            {movie.title}
                        </span>
                        <img
                            className={styles.img_slide}
                            src={`${process.env.IMG_ROUTE}${movie.poster_path}`}
                        />
                    </div>
                </Link>
            ))}
        </Carousel>
    );
}
