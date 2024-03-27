"use client";

import Image from "next/image";

import 'tailwindcss/tailwind.css';

import React from 'react';
import { DataGrid, GridExpandMoreIcon } from '@mui/x-data-grid';
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tree from "./exemplos/tree/Tree";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TreeJson from "./exemplos/tree/estudo/TreeJson";
import TreeTeste from "./exemplos/tree/TreeTeste";
import TreeEstudo from "./exemplos/tree/estudo/TreeEstudo";
import TreeJsonInicial from "./exemplos/tree/estudo/final/TreeInicial";
import TreeConverter from "./exemplos/tree/estudo/arvoreFinal/TreeConverter";
import { TreeSIDEC } from "./exemplos/tree/arvoreSidec/TreeSIDEC";

export const Item = styled( Paper )( ( { theme } ) => ( {
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
} ) );

export default function Home ()
{

  return (
    <Box>

      <hr />
      <br /><br />

      <TreeJson />

    </Box>
  );
}
