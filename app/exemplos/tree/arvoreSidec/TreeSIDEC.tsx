import React from "react";
import { SearchBox } from "./SearchBox";
import { ConvertButton } from "./ConvertButton";
import { TreeViewComp } from "./TreeViewComp";
import { TreeItem, TreeView } from '@mui/x-tree-view';
import { resultTree } from "../arqJson";
import { TextDescrition } from "./TextDescrition";

export interface TreeNode
{
    id: number;
    descricao: string;
    nodeId: string;
    children: TreeNode[];
    textoEmenta?: string | '';
}

export const TreeSIDEC = () =>
{
    const [ jsonData, setJsonData ] = React.useState<any[]>( [] );
    const [ data, setData ] = React.useState<TreeNode[]>( [] );
    const [ expandedNodes, setExpandedNodes ] = React.useState<string[]>( [] );
    const [ searchText, setSearchText ] = React.useState<string>( '' );
    const [ filteredSeasons, setFilteredSeasons ] = React.useState<TreeNode[]>( [] );
    const [ selectedDescription, setSelectedDescription ] = React.useState<string>( '' );

    const transformData = ( dados: any ) =>
    {
        const criarArvore = ( item: any, index: number ) =>
        {

            return {
                id: ( Math.floor( Math.random() * ( ( index * 222 ) - ( item.sqTitulo || item.sqSubtitulo || item.sqTopico ) + 1 ) ) + ( item.sqTitulo || item.sqSubtitulo || item.sqTopico ) ),
                sq: item.sqTitulo || item.sqSubtitulo || item.sqTopico,
                descricao: item.descricaoTitulo || item.descricaoSubtitulo || item.descricaoTopico,
                modeloAcordaoAssociado: item.modeloAcordaoAssociado,
                modeloAcordao: item.modeloAcordao,
                textoEmenta: item.textoEmenta,
                children: item.subtitulos
                    ? item.subtitulos.map( ( subtitulo: any ) => criarArvore( subtitulo, ++index ) )
                    : item.topicos
                        ? item.topicos.map( ( topico: any, ) => ( {

                            id: ( Math.floor( Math.random() * ( ( index * 222 ) - topico.sqTopico + 1 ) ) + topico.sqTopico ),
                            sq: topico.sqTitulo || topico.sqSubtitulo || topico.sqTopico,
                            descricao: topico.descricaoTopico,
                            modeloAcordaoAssociado: topico.modeloAcordaoAssociado,
                            modeloAcordao: topico.modeloAcordao,
                            textoEmenta: topico.textoEmenta,
                        } ) )
                        : null,
            };
        };

        return dados.map( ( item: any, index: number ) => criarArvore( item, index ) );
    };

    const handleItemClick = ( node: TreeNode ) =>
    {
        setSelectedDescription( node?.textoEmenta ?? '' );
    };

    const filterNodes = ( nodes: TreeNode[], term: string, expandedNodes: string[] ): TreeNode[] =>
    {
        const filtered: TreeNode[] = [];

        const traverse = ( node: TreeNode, isParentIncluded: boolean ): TreeNode | null =>
        {
            let shouldIncludeNode = node.descricao.toLowerCase().includes( term.toLowerCase() );

            if ( shouldIncludeNode || isParentIncluded )
            {
                const newNode: TreeNode = { ...node, children: [] };

                if ( node.children )
                {
                    newNode.children = node.children
                        .map( childNode => traverse( childNode, shouldIncludeNode || isParentIncluded ) )
                        .filter( child => child !== null ) as TreeNode[]; // Filter out null children
                }

                if ( !filtered.find( item => item.id === newNode.id ) )
                {
                    filtered.push( newNode );
                }

                if ( !expandedNodes.includes( node.id.toString() ) )
                {
                    expandedNodes.push( node.id.toString() );
                }

                return newNode;
            }

            if ( node.children )
            {
                const filteredChildren = node.children
                    .map( childNode => traverse( childNode, false ) )
                    .filter( child => child !== null ) as TreeNode[];

                if ( filteredChildren.length > 0 )
                {
                    const parentNode = { ...node, children: filteredChildren } as TreeNode;

                    if ( !filtered.find( item => item.id === parentNode.id ) )
                    {
                        filtered.push( parentNode );
                    }

                    if ( !expandedNodes.includes( node.id.toString() ) )
                    {
                        expandedNodes.push( node.id.toString() );
                    }

                    return parentNode;
                }
            }

            return null;
        };

        nodes.forEach( node =>
        {
            traverse( node, false );
        } );

        return filtered;
    };


    React.useEffect( () =>
    {
        if ( !searchText )
        {
            setFilteredSeasons( [] );
            return;
        }

        const nodesToExpand: string[] = [];
        data.forEach( ( node: TreeNode ) =>
        {
            const labelMatches = node.descricao.toLowerCase().includes( searchText.toLowerCase() );
            if ( labelMatches )
            {
                const nodeId = node.id.toString();
                nodesToExpand.push( nodeId );
                if ( node.children )
                {
                    node.children.forEach( child =>
                    {
                        nodesToExpand.push( child.id.toString() );
                    } );
                }
            }
        } );

        setExpandedNodes( prevExpandedNodes =>
        {
            const uniqueNodes = Array.from( new Set( [ ...prevExpandedNodes, ...nodesToExpand ] ) );
            return uniqueNodes;
        } );
    }, [ searchText, data ] );


    const handleConvertClick = () =>
    {
        setJsonData( resultTree );
        const transformedData = transformData( resultTree );
        setData( transformedData );
    };

    const handleSearchChange = ( event: React.ChangeEvent<HTMLInputElement> ) =>
    {
        const { value } = event.target;
        setSearchText( value );

        if ( value === '' )
        {
            setFilteredSeasons( [] );
            return; // Sair da função se o valor de pesquisa estiver vazio
        }

        // Criar uma cópia dos nós expandidos antes de filtrar
        const expandedNodesCopy = [ ...expandedNodes ];
        const filteredNodes = filterNodes( data, value.toLowerCase(), expandedNodesCopy );
        setFilteredSeasons( filteredNodes );

    };

    const renderTreeItem = ( node: TreeNode, expandedNodes: string[] ): JSX.Element | null =>
    {
        return (
            <TreeItem
                key={node.id}
                nodeId={node.id.toString()}
                label={node.descricao}
                onClick={() => handleItemClick( node )}
            >
                {node.children && node.children.map( ( childNode: TreeNode ) => renderTreeItem( childNode, expandedNodes ) )}
            </TreeItem>
        );
    };

    return (
        <div>
            <>
                <SearchBox searchText={searchText} onSearchChange={handleSearchChange} />
                <br />
            </>
            <>
                <ConvertButton onClick={handleConvertClick} />
                <br />
            </>
            <>
                <TreeViewComp
                    data={data}
                    expandedNodes={expandedNodes}
                    onNodeToggle={( event, nodeIds ) => setExpandedNodes( nodeIds )}
                    renderTreeItem={renderTreeItem}
                    filteredSeasons={filteredSeasons}
                    searchText={searchText}
                />
                <br />
            </>
            <>
                <TextDescrition description={selectedDescription} />
            </>
        </div>
    );
};
