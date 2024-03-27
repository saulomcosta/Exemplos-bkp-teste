// Search.tsx
import React from 'react';
import { TextField } from '@mui/material';

interface SearchProps
{
    onSearch: ( value: string ) => void;
}

const Search: React.FC<SearchProps> = ( { onSearch } ) =>
{
    const handleChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>
    {
        onSearch( event.target.value );
    };

    return <TextField type="text" onChange={handleChange} />;
};

export default Search;
