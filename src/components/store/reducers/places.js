import {ADD_PLACE,DELETE_PLACE} from '../actions/actionType';
const initialState = {
    places:[],
	selectedPlace:null
}
const reducer = (state = initialState,action) => {
    switch(action.type){
        case ADD_PLACE:
            return{
                ...state,
                places: state.places.concat({
					key: Math.random(),
					name:action.placeName,
					image:{
						uri:"https://foodchannelcom.files.wordpress.com/2017/06/double-chocolate-cheesecake.png"
					}
				})
            };
        case DELETE_PLACE:
            return{
                ...state,
                places: state.places.filter(place =>{
					return place.key !== action.placekey;
				}),
				selectedPlace : null
            };
        default:
            return state;
    }
}

export default reducer;