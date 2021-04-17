import React, {useState, useEffect} from 'react';

const Search = ({search}) => {

    const [searchPhrase, setSearchPhrase] = useState('')

    useEffect(() => {
        search(searchPhrase)
    }, [searchPhrase])

    return (
        <div className="w-full">
            <input
                className="w-full h-full px-4 py-2 rounded-md my-4 text-gray-500 text-sm border-2 border-gray-500"
                placeholder="Search..." 
                type="text"
                value={searchPhrase}
                onChange={(v) => setSearchPhrase(v.target.value)}    
            />
        </div>
    );
}

export default Search;
