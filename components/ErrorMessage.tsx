import React from 'react';

const ErrorMessage = ({msg}) => {
    return (
        <div className="w-full text-center text-red-500 pt-1 text-xs">
            <p>{msg}</p>
        </div>
    );
}

export default ErrorMessage;
