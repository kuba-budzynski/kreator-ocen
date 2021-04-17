import React from 'react';

const NavBar = () => {
    return (
        <nav className="w-screen max-w-full h-20 bg-warmGray-200 sticky">
            <div className="max-w-7xl mx-auto flex px-4 justify-center lg:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <h1 className="uppercase text-gray-500 text-sm sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-widest align-middle self-center">Kreator ofert</h1>
            </div>
        </nav>
    );
}

export default NavBar;
