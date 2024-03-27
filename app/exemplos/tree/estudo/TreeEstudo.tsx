// TreeEstudo.tsx
import React, { useState } from 'react';
import { seasons } from '../arqJson';
import TreeViewComponent from './TreeViewComponent2';
import Search from './Search';

export interface TreeNode
{
    id: number;
    name: string;
    children?: TreeNode[];
}

const TreeEstudo: React.FC = () =>
{
    const [ searchValue, setSearchValue ] = useState( '' );
    const [ expandedNodes, setExpandedNodes ] = useState<string[]>( [] );
    const [ selectedNode, setSelectedNode ] = useState<string | null>( null );

    const handleSearch = ( value: string ) =>
    {
        setSearchValue( value );
    };

    const handleNodeExpand = ( nodeId: string ) =>
    {
        setExpandedNodes( prevExpandedNodes =>
        {
            if ( prevExpandedNodes.includes( nodeId ) )
            {
                return prevExpandedNodes.filter( id => id !== nodeId );
            } else
            {
                return [ ...prevExpandedNodes, nodeId ];
            }
        } );
    };

    return (
        <div style={{ height: 400, width: '100%' }}>
            <div className="App">
                <Search onSearch={handleSearch} />
                <br /><br /><br />
                <TreeViewComponent
                    treeItems={seasons}
                    searchValue={searchValue}
                    expandedNodes={expandedNodes}
                    handleNodeExpand={handleNodeExpand}
                    setExpandedNodes={setExpandedNodes}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                />
            </div>
        </div>
    );
};

export default TreeEstudo;
