import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import {APIKey} from '../../common/apis/movieApiKey';

export const fetchAsyncMovies=createAsyncThunk(
    'movies/fetchAsyncMovies',
    async(term)=>{
        const movieText = 'Harry';
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
        .catch((err)=>{
            console.log(err);
        });
        //dispatch(addMovies(response.data));
        return response.data;
    }
);

export const fetchAsyncShows=createAsyncThunk(
    'movies/fetchAsyncShows',
    async (term) => {
        const seriesText = 'Friends';
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
        .catch((err)=>{
            console.log(err);
        });
        //dispatch(addMovies(response.data));
        return response.data;
    }
);
export const fetchAsyncDetails=createAsyncThunk(
    'movies/fetchAsyncDetails',
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&plot=full`)
        .catch((err)=>{
            console.log(err);
        });
        //dispatch(addMovies(response.data));
        return response.data;
    }
);

const initialState = {
    movies:{},
    shows:{},
    details:{},
};

const movieSlice =  createSlice({
    name:'Movies',
    initialState,
    reducers:{
        // addMovies: (state,{payload}) => {
        //     state.movies=payload;
        // },
        removeMovieDetails:(state)=>{
            state.details={};
        },
    },
    extraReducers: {
        [fetchAsyncMovies.pending]:()=>{
            console.log("pending Movies");
        },
        [fetchAsyncMovies.fulfilled]:(state,{payload})=>{
            console.log("fulfilled Movies");
            return {...state,movies:payload};
        },
        [fetchAsyncMovies.rejected]:()=>{
            console.log("rejected Movies");
        },
        [fetchAsyncShows.pending]:()=>{
            console.log("pending Shows");
        },
        [fetchAsyncShows.fulfilled]:(state,{payload})=>{
            console.log("fulfilled Shows");
            return {...state,shows:payload};
        },
        [fetchAsyncShows.rejected]:()=>{
            console.log("rejected Shows");
        },
        [fetchAsyncDetails.fulfilled]:(state,{payload})=>{
            console.log("fulfilled Details");
            return {...state,details:payload};
        },
    }
});
// we have used redux toolkit so we don't need spread operators here
// There is one more parameter called as extra reducers

// export const {addMovies} = movieSlice.actions;
export const {removeMovieDetails} = movieSlice.actions;
export const getAllMovies = (state) => state.movies;
export const getAllShows = (state) => state.shows;
export const getDetails = (state) =>state.details;
export default movieSlice.reducer;