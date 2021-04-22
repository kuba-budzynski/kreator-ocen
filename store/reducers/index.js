import { ADD_OFFER, REMOVE_OFFER } from "../constants";

const initialState = {
  offers: []
};

function rootReducer(state = initialState, action) {
  if (action.type === ADD_OFFER) {
    const other = state.offers.filter(f => f.id != action.payload.id)
    return Object.assign({}, state, {
      offers: [...other, action.payload]
    });
  }
  else if(action.type == REMOVE_OFFER){
    return Object.assign({}, state, initialState)
  }
  return state;
}

export default rootReducer;