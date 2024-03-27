import React from 'react';
import { TreeNode } from './TreeSIDEC';

interface DescriptionProps
{
    description: string;
}

export const TextDescrition: React.FC<DescriptionProps> = ( { description } ) =>
{
    return (

        <div style={{ flex: '1 1 50%', marginLeft: '10px' }}>
            <h2>Descrição do Item:</h2>
            <textarea
                value={description}
                style={{ width: '100%', height: '100%', padding: '5px', backgroundColor: 'whitesmoke' }}
                readOnly
            />
        </div>
    );
};
