import React from 'react';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeNode } from './TreeSIDEC';

interface TreeViewCompProps
{
    data: TreeNode[];
    expandedNodes: string[];
    onNodeToggle: ( event: React.SyntheticEvent<Element, Event>, nodeIds: string[] ) => void;
    renderTreeItem: ( node: TreeNode, expandedNodes: string[] ) => JSX.Element | null;
    filteredSeasons: TreeNode[];
    searchText: string;
}

export const TreeViewComp = ( {
    data,
    expandedNodes,
    onNodeToggle,
    renderTreeItem,
    filteredSeasons,
    searchText,
}: TreeViewCompProps ) => (
    <TreeView
        key={Date.now()}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedNodes}
        onNodeToggle={( event, nodeIds ) => onNodeToggle( event, nodeIds )}
    >
        {searchText === '' ? (
            data.map( ( node ) => renderTreeItem( node, expandedNodes ) )
        ) : (
            filteredSeasons.map( ( node ) => renderTreeItem( node, expandedNodes ) )
        )}
    </TreeView>
);
