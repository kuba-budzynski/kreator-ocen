import React from 'react';
import store from '../store/index'
import {addOffer} from '../store/actions/index'

const NavBar = ({onClick}) => {
    return (
        <nav className="w-screen max-w-full h-20 bg-warmGray-200 sticky">
            <div className="max-w-9xl mx-auto flex justify-between px-3">
                <div className="flex px-4 justify-start lg:justify-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <h1 className="uppercase text-gray-500 text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest align-middle self-center">Kreator ofert</h1>
                </div>
                <div className="my-auto">
                    <button className="px-4 lg:px-8 py-1 border-2 border-gray-500 text-gray-500 text-lg lg:text-3xl font-bold rounded-xl uppercase hover:border-gray-600 hover:text-gray-600" 
                        onClick={onClick}>
                        Reset
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
