import React, { Dispatch, SetStateAction, useState } from 'react';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { resultTree, seasons } from "../arqJson";
import { SearchComponent } from './SearchComponent';
import { ConvertButton } from '../arvoreSidec/ConvertButton';

export interface TreeNode
{
    id: number;
    sq: number;
    descricao: string;
    modeloAcordaoAssociado: boolean;
    modeloAcordao: boolean;
    nodeId: string; // Adicione a propriedade nodeId ao tipo TreeNode
    textoEmenta: string;
    children: TreeNode[];
    parent: TreeNode | null; // Adicione a propriedade parent
}

const getFilteredTreeItems = ( treeItems: TreeNode[], searchValue: string ): TreeNode[] =>
{
    const filteredItems: TreeNode[] = [];

    for ( const item of treeItems )
    {
        const labelMatches = item.descricao.toLowerCase().includes( searchValue.toLowerCase() );

        if ( labelMatches )
        {
            filteredItems.push( item );
        } else if ( item.children )
        {
            const children = getFilteredTreeItems( item.children, searchValue );
            if ( children.length > 0 )
            {
                filteredItems.push( {
                    ...item,
                    children,
                } );
            }
        }
    }

    return filteredItems;
};

export interface DataTreeViewProps
{
    treeItems: TreeNode[];
    searchValue: string;
    handleNodeExpand: (
        nodeId: string,
        expandedNodes: string[],
        setExpandedNodes: ( value: string[] ) => void
    ) => void;
    setExpandedNodes: Dispatch<SetStateAction<string[]>>;
    selectedNode: string | null;
    setSelectedNode: Dispatch<SetStateAction<string | null>>;
    setObservation: Dispatch<SetStateAction<string>>;
    expandAll: boolean; // Adicione a propriedade expandAll ao tipo
    expandedNodes: string[]; // Adicione expandedNodes como uma propriedade
}

export const DataTreeView = ( {
    treeItems,
    searchValue,
    handleNodeExpand,
    setExpandedNodes,
    selectedNode,
    setSelectedNode,
    setObservation,
    expandAll, // Adicione a propriedade expandAll
    expandedNodes, // Adicione expandedNodes às propriedades
}: DataTreeViewProps ) =>
{

    const filteredTreeItems = getFilteredTreeItems( treeItems, searchValue );

    const handleItemClick = ( treeItemData: TreeNode, expandedNodes: string[] ) =>
    {
        handleNodeExpand( treeItemData.id.toString(), expandedNodes, setExpandedNodes );
        setSelectedNode( treeItemData.id.toString() );
        setObservation( treeItemData.textoEmenta || '' );
    };

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expandedNodes} // Use o estado expandedNodes para expandir os nós
            onNodeToggle={( event, nodeIds ) => setExpandedNodes( nodeIds )} // Atualize o estado expandedNodes ao expandir ou recolher um nó
        >
            {filteredTreeItems.length > 0 ? (
                filteredTreeItems.map( ( treeItemData ) => (
                    <TreeItem
                        key={treeItemData.id}
                        nodeId={treeItemData.id.toString()}
                        label={treeItemData.descricao}
                        style={{
                            color: treeItemData.id.toString() === selectedNode ? 'blue' : 'black',
                            fontWeight: treeItemData.id.toString() === selectedNode ? 'bold' : 'normal',
                            fontFamily: 'sans-serif',
                        }}
                        onClick={() => handleItemClick( treeItemData, expandedNodes )}
                    >
                        {treeItemData.children && treeItemData.children.length > 0 && (
                            <DataTreeView
                                treeItems={treeItemData.children}
                                searchValue={searchValue}
                                handleNodeExpand={handleNodeExpand}
                                setExpandedNodes={setExpandedNodes}
                                selectedNode={selectedNode}
                                setSelectedNode={setSelectedNode}
                                setObservation={setObservation}
                                expandAll={expandAll}
                                expandedNodes={expandedNodes} // Passe expandedNodes para o componente DataTreeView
                            />
                        )}
                    </TreeItem>
                ) )
            ) : (
                <TreeItem nodeId="0" label="No results found" />
            )}
        </TreeView>
    );
};

export default function TreeJson ()
{
    const [ filteredSeasons, setFilteredSeasons ] = React.useState<TreeNode[]>( [] );
    const [ searchValue, setSearchValue ] = React.useState( '' );
    const [ expandedNodes, setExpandedNodes ] = React.useState<string[]>( [] );
    const [ selectedNode, setSelectedNode ] = React.useState<string | null>( null );
    const [ observation, setObservation ] = React.useState<string>( '' );
    const [ jsonData, setJsonData ] = React.useState<any[]>( [] );
    const [ data, setData ] = React.useState<TreeNode[]>( [] );
    const [ searchText, setSearchText ] = React.useState<string>( '' );

    const handleSearch = ( value: string, treeItems: TreeNode[] ) =>
    {
        setSearchValue( value );

        if ( value === "" )
        {
            setExpandedNodes( [] );
            return;
        }
    };

    const handleNodeExpand = ( searchValue: string ) =>
    {
        const nodesToExpand: string[] = [];
        const findNodeAndExpand = ( nodes: TreeNode[], searchString: string ) =>
        {
            for ( const node of nodes )
            {
                if ( node.descricao.toLowerCase().includes( searchString.toLowerCase() ) )
                {
                    let currentNode: TreeNode | null = node;
                    while ( currentNode && currentNode.parent )
                    {
                        if ( !nodesToExpand.includes( currentNode.parent.id.toString() ) )
                        {
                            nodesToExpand.push( currentNode.parent.id.toString() );
                        }
                        currentNode = currentNode.parent;
                    }
                }
                if ( node.children )
                {
                    findNodeAndExpand( node.children, searchString );
                }
            }
        };
        findNodeAndExpand( data, searchValue );
        setExpandedNodes( ( prevExpandedNodes ) =>
        {
            const uniqueNodes = Array.from( new Set( [ ...prevExpandedNodes, ...nodesToExpand ] ) );
            return uniqueNodes;
        } );
    };

    const transformData = ( dados: any ) =>
    {
        const criarArvore = ( item: any, index: number, parent: TreeNode | null ) =>
        {
            const treeNode: TreeNode = {
                id: ( Math.floor( Math.random() * ( ( index * 222 ) - ( item.sqTitulo || item.sqSubtitulo || item.sqTopico ) + 1 ) ) + ( item.sqTitulo || item.sqSubtitulo || item.sqTopico ) ),
                nodeId: `node-${ item.id }`, // Adicione o nodeId ao nó
                sq: item.sqTitulo || item.sqSubtitulo || item.sqTopico,
                descricao: item.descricaoTitulo || item.descricaoSubtitulo || item.descricaoTopico,
                modeloAcordaoAssociado: item.modeloAcordaoAssociado,
                modeloAcordao: item.modeloAcordao,
                textoEmenta: item.textoEmenta,
                children: [],
                parent: parent, // Adicione o nó pai ao nó atual
            };

            if ( item.subtitulos )
            {
                treeNode.children = item.subtitulos.map( ( subtitulo: any ) => criarArvore( subtitulo, ++index, treeNode ) );
            } else if ( item.topicos )
            {
                treeNode.children = item.topicos.map( ( topico: any ) => criarArvore( topico, ++index, treeNode ) );
            }

            return treeNode;
        };

        return dados.map( ( item: any, index: number ) => criarArvore( item, index, null ) );
    };

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
        setSearchValue( value ); // Atualize o estado searchValue com o novo valor

    };

    return (
        <div>
            <>
                <ConvertButton onClick={handleConvertClick} />
                <br />
                <br />
            </>
            <>
                <SearchComponent
                    onSearch={handleSearch} // Verifique se o nome da propriedade e a função são os mesmos
                    onNodeExpand={handleNodeExpand}
                    treeItems={data}
                />
                <br />
                <br />
            </>
            <>
                <DataTreeView
                    treeItems={data}
                    searchValue={searchValue}
                    handleNodeExpand={handleNodeExpand}
                    setExpandedNodes={setExpandedNodes}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    setObservation={setObservation}
                    expandAll={false} // Defina o valor de expandAll aqui
                    expandedNodes={expandedNodes} // Passe expandedNodes para o componente DataTreeView
                />
            </>
            <>
                <br />
                <br />
                <textarea
                    value={observation}
                    style={{ width: '100%', height: '100%', padding: '5px', backgroundColor: 'silver' }}
                    readOnly
                />

            </>

        </div>
    );
}
