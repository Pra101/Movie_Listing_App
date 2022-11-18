import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies,getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard'
import Slider from 'react-slick';
import './MovieListing.scss';
import { Settings } from '../../common/Settings';

const MovieListing = () => {
    
    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    
    let renderMovies = (<div>init</div>);
    if(movies.Response === "True"){
        renderMovies = movies.Search.map((movie,index)=>{
            return (<MovieCard key={index} data={movie}/>);
        });
    }
    else {
        renderMovies = (
            <div className='movies-error'>
                <h1>{movies.error}</h1>
            </div>
        )
    }

    let renderShows = (<div>init</div>);
    if(shows.Response === "True"){
        renderShows = shows.Search.map((show,index)=>{
            return (<MovieCard key={index} data={show}/>);
        });
    }
    else {
        renderMovies = (
            <div className='movies-error'>
                <h1>{shows.error}</h1>
            </div>
        )
    }

    return (
        <div className='movie-wrapper'>
            <div className='movie-list'>
                <h2>Movies</h2>
                <div className='movie-container'>
                    <Slider {...Settings}>
                        {renderMovies}
                    </Slider>
                </div>
            </div>
            <div className='show-list'>
                <h2>Shows</h2>
                <div className='show-container'>
                    <Slider {...Settings}>
                        {renderShows}
                    </Slider>
                </div>
            </div>
        </div>
        
    )
};

export default MovieListing;