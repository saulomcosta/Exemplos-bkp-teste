import React, { useState } from 'react';
import { Typography, TextField } from '@mui/material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { resultTree } from '../../arqJson';
import { handleJson } from '../../ControlerTree';

interface TreeNode
{
    id: number;
    sq: number;
    descricao: string;
    modeloAcordaoAssociado: boolean;
    modeloAcordao: boolean;
    textoEmenta: string;
    children?: TreeNode[];
}

const renderTree = ( nodes: TreeNode, expandedNodes: string[] ): React.ReactNode => (
    <TreeItem key={nodes.id} nodeId={nodes.id.toString()} label={nodes.descricao}>
        {Array.isArray( nodes.children ) ? nodes.children.map( ( node ) => renderTree( node, expandedNodes ) ) : null}
    </TreeItem>
);

const getParentNodeId = ( nodeId: number, allNodes: TreeNode[] ): number | null =>
{
    for ( const node of allNodes )
    {
        if ( node.children && node.children.some( child => child.id === nodeId ) )
        {
            return node.id;
        }
        if ( node.children )
        {
            const parent = getParentNodeId( nodeId, node.children );
            if ( parent !== null )
            {
                return parent;
            }
        }
    }
    return null;
};

const TreeJsonInicial = () =>
{
    const [ searchTerm, setSearchTerm ] = useState<string>( '' );
    const [ filteredSeasons, setFilteredSeasons ] = useState<TreeNode[]>( [] );
    const [ expandedNodes, setExpandedNodes ] = useState<string[]>( [] );

    const handleSearch = ( event: React.ChangeEvent<HTMLInputElement> ) =>
    {
        const { value } = event.target;
        setSearchTerm( value );

        if ( value === '' )
        {
            setFilteredSeasons( [] );
            return; // Sair da função se o valor de pesquisa estiver vazio
        }

        // Criar uma cópia dos nós expandidos antes de filtrar
        const expandedNodesCopy = [ ...expandedNodes ];
        //const filteredNodes = filterNodes( resultTree, value.toLowerCase(), expandedNodesCopy );
        //setFilteredSeasons( filteredNodes );
    };


    const getParentNode = ( nodeId: number, nodes: TreeNode[] ): TreeNode | null =>
    {
        for ( const node of nodes )
        {
            if ( node.id === nodeId )
            {
                return node;
            }
            if ( node.children )
            {
                const parentNode = getParentNode( nodeId, node.children );
                if ( parentNode )
                {
                    return parentNode;
                }
            }
        }
        return null;
    };

    /*
        const expandParentNodes = ( node: Node, expandedNodes: string[] ) =>
        {
            const parentsToAdd: string[] = [];
            let currentNode: Node | null = getParentNode( node.id, resultTree );
    
            while ( currentNode !== null )
            {
                const parentIdString = currentNode.id.toString();
                if ( !expandedNodes.includes( parentIdString ) && !parentsToAdd.includes( parentIdString ) )
                {
                    parentsToAdd.push( parentIdString );
                }
    
                // Adicione esta verificação para evitar um loop infinito
                if ( currentNode.id !== node.id )
                {
                    currentNode = getParentNode( currentNode.id, resultTree );
                } else
                {
                    break;
                }
            }
    
            setExpandedNodes( [ ...expandedNodes, ...parentsToAdd ] );
        };
    */

    const filterNodes = ( nodes: TreeNode[], term: string, expandedNodes: string[] ): TreeNode[] =>
    {
        const filtered: TreeNode[] = [];

        const traverse = ( node: TreeNode ): TreeNode | null =>
        {
            let shouldIncludeNode = node.descricao.toLowerCase().includes( term );

            if ( shouldIncludeNode )
            {
                // Se o nó atual corresponde ao termo, retornar o próprio nó
                filtered.push( node );
                if ( !expandedNodes.includes( node.id.toString() ) )
                {
                    expandedNodes.push( node.id.toString() );
                }
                return node;
            }

            if ( node.children )
            {
                // Se o nó não corresponde ao termo, mas tem filhos, verificar os filhos
                const filteredChildren = node.children.reduce( ( acc: TreeNode[], childNode: TreeNode ) =>
                {
                    const filteredChild = traverse( childNode );
                    if ( filteredChild )
                    {
                        //acc.push( filteredChild );
                    }
                    return acc;
                }, [] );

                if ( filteredChildren.length > 0 )
                {
                    // Se algum filho foi incluído, incluir apenas o nó com os filhos correspondentes
                    const newNode = { ...node, children: filteredChildren };
                    filtered.push( newNode );
                    if ( !expandedNodes.includes( node.id.toString() ) )
                    {
                        expandedNodes.push( node.id.toString() );
                    }
                    return newNode;
                }
            }

            return null;
        };

        nodes.forEach( ( node ) =>
        {
            traverse( node );
        } );

        return filtered;
    };

    let searchTree: TreeNode[] = handleJson();

    return (
        <div>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                margin="normal"
            />
            <TreeView
                key={Date.now()}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                expanded={expandedNodes}
                onNodeToggle={( event, nodeIds ) => setExpandedNodes( nodeIds )}
            >
                {searchTerm === '' ? (
                    searchTree.map( ( node: any ) => renderTree( node, expandedNodes ) )
                ) : (
                    filteredSeasons.map( ( node ) => renderTree( node, expandedNodes ) )
                )}
            </TreeView>
        </div>
    );
};

export default TreeJsonInicial;
