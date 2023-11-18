import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddIcon from '@mui/icons-material/FileCopyOutlined';

const actions = [
  { icon: <AddIcon />, name: 'Add new platform' },
];

interface CustomSpeedDialProps {
    className: string
};

const CustomSppedDial: React.FC<CustomSpeedDialProps> = (props) => {
  return (
    <div className={props.className}>
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            {actions.map((action) => (
            <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
            />
            ))}
        </SpeedDial>
        </Box>
    </div>
  );
}

export default CustomSppedDial;