// TreeItemComponent.tsx
import React from 'react';
import { TreeItem } from '@mui/x-tree-view';

interface TreeItemProps
{
    nodeId: string;
    label: string;
    selected: boolean;
    onClick: () => void;
}

const TreeItemComponent: React.FC<TreeItemProps> = ( { nodeId, label, selected, onClick } ) =>
{
    return (
        <TreeItem
            key={nodeId}
            nodeId={nodeId}
            label={label}
            style={{
                color: selected ? 'blue' : 'black',
                fontWeight: selected ? 'bold' : 'normal',
                fontFamily: 'sans-serif',
            }}
            onClick={onClick}
        />
    );
};

export default TreeItemComponent;