"use client";

import Image from "next/image";

import React from 'react';
import { DataGrid, GridExpandMoreIcon } from '@mui/x-data-grid';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Tree ()
{

    return (
        <div style={{ height: 400, width: '100%' }}>


            <TreeView
                aria-label="folder"
                defaultCollapseIcon={<GridExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                </TreeItem>
                <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="6" label="Material-UI">
                        <TreeItem nodeId="7" label="src">
                            <TreeItem nodeId="8" label="index.js" />
                            <TreeItem nodeId="9" label="tree-view.js" />
                        </TreeItem>
                    </TreeItem>
                </TreeItem>
            </TreeView>

        </div>
    );
}
