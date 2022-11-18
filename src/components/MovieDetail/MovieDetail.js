import React, { useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAsyncDetails, getDetails, removeMovieDetails } from '../../features/movies/movieSlice';
import './MovieDetail.scss';

const MovieDetail = () => {
    const {imdbID}=useParams();
    const dispatch=useDispatch();
    const data=useSearchParams(getDetails);
    useEffect(()=>{
        dispatch(fetchAsyncDetails(imdbID));
        return ()=>{
            dispatch(removeMovieDetails);
        };
    },[dispatch,imdbID]);
    // console.log("dets",data);
    const dat = useSelector(getDetails);
    return (
        <div className='movie-section'>
            {Object.keys(dat).length===0?(<div>...loading</div>):
            (<>
            <div className='section-left'>
                <div className='movie-title'>{dat.Title}</div>
                <div className='movie-rating'>
                    <span>
                        IMDB Rating <i className="fa fa-star"></i> : {dat.imdbRating}
                    </span>
                    <span>
                        IMDB Votes <i className="fa fa-thumbs-up"></i> : {dat.imdbVotes}
                    </span>
                    <span>
                        Runtime <i className="fa fa-film"></i> : {dat.Runtime}
                    </span>
                    <span>
                        Year <i className="fa fa-calendar"></i> : {dat.Year}
                    </span>
                </div>
                <div className='movie-plot'>{dat.Plot}</div>
                <div className='movie-info'>
                    <div>
                        <span>Director</span>
                        <span>{dat.Director}</span>
                    </div>
                    <div>
                        <span>Actors</span>
                        <span>{dat.Actors}</span>
                    </div>
                    <div>
                        <span>Generes</span>
                        <span>{dat.Genre}</span>
                    </div>
                    <div>
                        <span>Languages</span>
                        <span>{dat.Language}</span>
                    </div>
                    <div>
                        <span>Awards</span>
                        <span>{dat.Awards}</span>
                    </div>
                </div>
            
            </div>
            <div className='section-right'>
                <img
                    src={dat.Poster}
                    alt={dat.Title}
                />
            </div>
            </>)
            }
        </div>
    );
};

export default MovieDetail;