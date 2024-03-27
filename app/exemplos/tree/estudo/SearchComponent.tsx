import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { TreeNode } from '../estudo/TreeJson';

export interface SearchComponentProps
{
    onSearch: ( value: string, treeItems: TreeNode[] ) => void; // Adicione treeItems como parâmetro
    onNodeExpand: ( nodeId: string ) => void;
    treeItems?: TreeNode[];
}

export const SearchComponent = ( { onSearch, onNodeExpand, treeItems }: SearchComponentProps ) =>
{
    const [ expandAll, setExpandAll ] = useState<boolean>( false );
    const [ searchedNodeId, setSearchedNodeId ] = useState<string | null>( null ); // Armazena o nodeId da pesquisa atual

    const findNodeIdBySearch = ( searchValue: string, nodes: TreeNode[] ): string | null =>
    {
        const findNodeId = ( node: TreeNode ): string | null =>
        {

            if ( node.descricao.toLowerCase().includes( searchValue.toLowerCase() ) )
            {
                return node.descricao.toString();
            }
            if ( node.children )
            {
                for ( const child of node.children )
                {
                    const found = findNodeId( child );
                    if ( found )
                    {
                        return found;
                    }
                }
            }
            return null;
        };

        for ( const node of nodes )
        {
            const found = findNodeId( node );
            if ( found )
            {
                return found;
            }
        }

        return null;
    };

    const handleSearch = ( searchValue: string ) =>
    {
        onSearch(
            searchValue,
            treeItems ?? []
        );
        const foundNodeId = findNodeIdBySearch( searchValue, treeItems ?? [] );
        setSearchedNodeId( foundNodeId );
        if ( foundNodeId !== null )
        {
            onNodeExpand( foundNodeId );
        }
    };

    return (
        <div>
            <TextField
                label="Pesquisar"
                variant="outlined"
                fullWidth
                onChange={( e ) => handleSearch( e.target.value )}
                sx={{ mt: 2 }}
            />
            <Button
                onClick={() => setExpandAll( !expandAll )}
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
            >
                {expandAll ? 'Recolher Todos' : 'Expandir Todos'}
            </Button>
        </div>
    );
};

