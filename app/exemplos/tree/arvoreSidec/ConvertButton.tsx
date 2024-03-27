import { Button, TextField } from '@mui/material';

export const ConvertButton = ( { onClick }: { onClick: () => void; } ) => (
    <Button variant="contained" className='bg-slate-900' onClick={onClick}>
        Converter JSON
    </Button>
);
