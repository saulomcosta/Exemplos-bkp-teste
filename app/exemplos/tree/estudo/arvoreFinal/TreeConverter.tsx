import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { TreeItem, TreeView } from '@mui/x-tree-view';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { resultTree } from '../../arqJson';

interface TreeNode
{
    id: string;
    label: string;
    nodeId: string; // Adiciona nodeId à interface
    children: TreeNode[];
}

// Função recursiva para transformar o JSON em uma estrutura compatível com o TreeView
const transformData = ( data: any[] ): TreeNode[] =>
{
    if ( !Array.isArray( data ) )
    {
        return []; // ou outro valor apropriado
    }

    return data.map( ( item: any ) =>
    {
        const node: TreeNode = {
            id: item.sqTitulo ? item.sqTitulo.toString() : '',
            label: item.descricaoTitulo,
            nodeId: item.sqTitulo ? item.sqTitulo.toString() : '', // Adiciona nodeId aqui
            children: [],
        };
        if ( item.subtitulos )
        {
            node.children = transformData( item.subtitulos );
        }


        return node;
    } );
};

const TreeViewComponent = ( { data }: any ) =>
{
    const [ filter, setFilter ] = useState( '' );

    const handleChange = ( event: any ) =>
    {
        setFilter( event.target.value );
    };

    const filteredData = data.filter( ( item: any ) =>
        item && item.label && item.label.toLowerCase().includes( filter.toLowerCase() )

    );

    return (
        <div>
            <TextField
                label="Filtrar"
                variant="outlined"
                value={filter}
                onChange={handleChange}
            />

            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {filteredData.map( ( node: any ) => (
                    <TreeItem key={node.id} nodeId={node.nodeId} label={node.label}>
                        {node.children.map( ( childNode: any ) => (
                            <TreeItem key={childNode.id} nodeId={childNode.nodeId} label={childNode.label} />
                        ) )}
                    </TreeItem>
                ) )}
            </TreeView>


            {filteredData.length === 0 && (
                <Typography variant="body2">Nenhum resultado encontrado.</Typography>
            )}
        </div>
    );
};

// Exemplo de uso
const jsonData = resultTree;

const TreeConverter = () =>
{
    const data = transformData( jsonData );

    return (
        <div>
            <TreeViewComponent data={data} />
        </div>
    );
};

export default TreeConverter;
