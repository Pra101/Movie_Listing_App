import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import pic from '../../images/pic.jpeg';
import './Header.scss';

const Header = () => {
    const [term,setTerm]=useState("");
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault();
        if(term===""){
            return alert("Please Enter Search Term");
        }
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        setTerm("");
        console.log(term);
    };
    return (
        <div className='header'>
            <div className='logo'>
                <Link to='/'>Movie App</Link>
            </div>
            <div className='search-bar'>
                <form onSubmit={submitHandler}>
                    <input 
                        type='text'
                        value={term}
                        placeholder='Search Movies or Shows'
                        onChange={(e)=>setTerm(e.target.value)}
                    />
                    <button type='submit'><i className='fa fa-search'></i></button>
                </form>
            </div>
            <div className='user-image'>
                <img
                    src={pic}
                    alt='user'
                />
            </div>
        </div>
    );
};



export default Header;