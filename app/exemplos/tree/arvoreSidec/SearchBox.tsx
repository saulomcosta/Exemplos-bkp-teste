import React, { ChangeEvent } from "react";
import { Button, TextField } from '@mui/material';
import { TreeNode } from '../estudo/TreeJson';

interface SearchBoxProps
{
    searchText: string;
    onSearchChange: ( event: ChangeEvent<HTMLInputElement> ) => void;
}

export const SearchBox = ( { searchText, onSearchChange }: SearchBoxProps ) => (
    <TextField
        label="Pesquisar"
        variant="outlined"
        fullWidth
        onChange={onSearchChange}
        sx={{ mt: 2 }}
    />
);
