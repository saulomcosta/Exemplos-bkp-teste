import React, { useState } from 'react';
import { resultTree } from './arqJson';


const [ tree, setTree ] = React.useState<[]>( [] );

const adaptarDadosParaTreeView = ( dados: any ) =>
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

export const handleJson = () =>
{
    const dadosTreeView = adaptarDadosParaTreeView( resultTree );
    setTree( dadosTreeView );
    return dadosTreeView;
};

