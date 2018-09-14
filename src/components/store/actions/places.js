import {ADD_PLACE, DELETE_PLACE } from './actionType';

export const addPlace = (placeName) =>{
    return {
        type: ADD_PLACE,
        placeName: placeName
    };
};

export const deletePlace = (key) =>{
    return {
        type: DELETE_PLACE,
        placekey: key
       
    };
};