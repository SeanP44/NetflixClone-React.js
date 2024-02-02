import React, { useEffect, useState } from 'react'
import axios, { imageBaseUrl } from "../../services/axios"
import "../tilesrow/tilerow.css";
import reviewRating from '../../assets/icons8-Star.png'
import playButton from '../../assets/play-button-o-svgrepo-com.svg'
import Carousel from "@itseasy21/react-elastic-carousel";
import Popup from 'reactjs-popup';


const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 550, itemsToShow: 2, itemsToScroll: 2, pagination: false },
    { width: 768, itemsToShow: 3, pagination: false },
    { width: 1200, itemsToShow: 5, itemsToScroll: 2, pagination: false }
];


export default function TilesRow({ title, requestUrl, topRow }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function getMovies() {
            const response = await axios.get(requestUrl);
            setMovies(response.data.results);

            console.log(response.data.results)
        };
        getMovies();
    }, [requestUrl]);


    return (
        <div className='row-container'>
            <h2 className='row-title'>{title}</h2>

            <div className='tiles-row-container'>
                <Carousel itemPadding={[0, 20]} breakPoints={breakPoints}>
                    {movies.map(movie => (
                        <div className='movie-item'>

                            <Popup trigger={<img key={movie.id} className={`image-tile ${topRow && "image-tile-top-row"}`} src={`${imageBaseUrl}${topRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`} alt={movie.name} />} modal>

                                <div className='popup'>

                                    <img key={movie.id} className={`details-image ${topRow && "image-tile-top-row"}`} src={`${imageBaseUrl}${movie.poster_path || movie.backdrop_path}`} alt={movie.name} />
                                    <div className='popup-container'>

                                        <p className='pop-uptitle'>Title:</p>
                                        <p className='popup-contents'>{movie.title || movie.name || movie.original_name}</p>

                                        <p className='pop-uptitle'>Overview:</p>
                                        <p className='popup-overview'>{movie.overview}</p>

                                        <p className='pop-uptitle'>Release date:</p>
                                        <p className='popup-contents'>{movie.release_date}</p>

                                        <p className='pop-uptitle'>Rating:</p>

                                        <div className='movie-rating-rowpopup'>
                                            <img className='reviewRating-row' src={reviewRating} alt='rating' />
                                            <p className='movie-title-rating'> {Math.round(movie.vote_average)}/10</p>
                                        </div>
                                    </div>
                                </div>

                            </Popup>

                            <div className='info'>
                                <div className='movie-title-group'>
                                    <img className='play-button' src={playButton} alt='play-button' />
                                    <p className='movie-title-row'>{movie.title || movie.name || movie.original_name}</p>
                                </div>

                                <div className='movie-rating-row'>
                                    <img className='reviewRating-row' src={reviewRating} alt='rating' />
                                    <p className='movie-title-rating'> {Math.round(movie.vote_average)}/10</p>
                                </div>
                            </div>
                        </div>))}
                </Carousel>
            </div>
        </div>

    )
}
