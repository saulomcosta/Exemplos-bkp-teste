import React from 'react';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TreeNode } from './TreeSIDEC';

const TreeViewComponent = ( {
    data,
    expandedNodes,
    onNodeToggle,
    renderTreeItem,
    filteredSeasons,
    searchText,
}: {
    data: TreeNode[];
    expandedNodes: string[];
    onNodeToggle: ( event: React.ChangeEvent<HTMLInputElement>, nodeIds: string[] ) => void;
    renderTreeItem: ( node: TreeNode, expandedNodes: string[] ) => JSX.Element | null;
    filteredSeasons: TreeNode[];
    searchText: string;
} ) => (
    <TreeView
        key={Date.now()}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expandedNodes}
        onNodeToggle={onNodeToggle}
    >
        {searchText === '' ? (
            data.map( ( node: any ) => renderTreeItem( node, expandedNodes ) )
        ) : (
            filteredSeasons.map( ( node ) => renderTreeItem( node, expandedNodes ) )
        )}
    </TreeView>
);

