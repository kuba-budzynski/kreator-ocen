import {ADD_OFFER, REMOVE_OFFER} from '../constants'

export function addOffer(payload) {
    return { type: ADD_OFFER, payload }
};

export function clean(payload) {
  return { type: REMOVE_OFFER, payload }
};