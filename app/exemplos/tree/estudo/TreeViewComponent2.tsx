import React from 'react';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import TreeItemComponent from './TreeItemComponent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Defina a interface Season
interface Season
{
    id: number;
    descricao: string;
    nodeId?: string;
    children?: Season[];
}

interface TreeViewProps
{
    treeItems: Season[];
    searchValue: string;
    expandedNodes: string[];
    handleNodeExpand: ( nodeId: string ) => void;
    setExpandedNodes: React.Dispatch<React.SetStateAction<string[]>>;
    selectedNode: string | null;
    setSelectedNode: React.Dispatch<React.SetStateAction<string | null>>;
}

const TreeViewComponent: React.FC<TreeViewProps> = ( {
    treeItems,
    searchValue,
    expandedNodes,
    handleNodeExpand,
    setExpandedNodes,
    selectedNode,
    setSelectedNode,
} ) =>
{
    const getFilteredTreeItems = ( treeItems: Season[] ): JSX.Element[] =>
    {
        return treeItems
            .filter( ( treeItemData: Season ) =>
                treeItemData.descricao.toLowerCase().includes( searchValue.toLowerCase() )
            )
            .flatMap( ( treeItemData: Season ) => (
                <TreeItemComponent
                    key={treeItemData.id.toString()}
                    nodeId={treeItemData.id.toString()}
                    label={treeItemData.descricao}
                    selected={selectedNode === treeItemData.id.toString()}
                    onClick={() =>
                    {
                        setSelectedNode( treeItemData.id.toString() );
                        handleNodeExpand( treeItemData.id.toString() );
                    }}
                />
            ) );
    };

    const filteredTreeItems = getFilteredTreeItems( treeItems );

    return (
        <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
            {filteredTreeItems.length > 0 ? (
                filteredTreeItems
            ) : (
                <TreeItem nodeId="0" label="No results found" />
            )}
        </TreeView>
    );
};

export default TreeViewComponent;
